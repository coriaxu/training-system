import { Budget } from '@/types/budget';
import { useState, useEffect } from 'react';

interface Expense {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
}

interface ExpenseTableProps {
  budget: Budget | null;
}

export default function ExpenseTable({ budget }: ExpenseTableProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [formData, setFormData] = useState({
    type: '日常培训',
    amount: 0,
    description: '',
    date: new Date().toISOString().slice(0, 10),
  });

  // 获取费用数据
  useEffect(() => {
    fetch('/api/expense')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setExpenses(data);
        }
      })
      .catch(error => console.error('获取费用数据失败:', error));
  }, []);

  // 保存费用
  const handleSaveExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          month: new Date().toISOString().slice(0, 7),
        }),
      });

      if (response.ok) {
        const newExpense = await response.json();
        setExpenses([newExpense, ...expenses]);
        setShowExpenseForm(false);
        setFormData({
          type: '日常培训',
          amount: 0,
          description: '',
          date: new Date().toISOString().slice(0, 10),
        });
      } else {
        throw new Error('保存费用失败');
      }
    } catch (error) {
      console.error('保存费用失败:', error);
      alert('保存费用失败，请重试');
    }
  };

  if (!budget) {
    return (
      <div className="card animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  // 计算每种类型的总支出
  const expensesByType = expenses.reduce((acc, expense) => {
    acc[expense.type] = (acc[expense.type] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-heading-2">预算与支出明细</h2>
          <button
            onClick={() => setShowExpenseForm(!showExpenseForm)}
            className="btn-primary"
          >
            {showExpenseForm ? '取消' : '添加支出'}
          </button>
        </div>

        {showExpenseForm && (
          <form onSubmit={handleSaveExpense} className="mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">课程类型</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="input"
                >
                  <option value="日常培训">日常培训</option>
                  <option value="专项培训">专项培训</option>
                  <option value="特殊项目">特殊项目</option>
                </select>
              </div>
              <div>
                <label className="label">金额</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">日期</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">描述</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-primary">
              保存支出
            </button>
          </form>
        )}

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>课程类型</th>
                <th>预算金额</th>
                <th>已用金额</th>
                <th>剩余金额</th>
                <th>使用比例</th>
              </tr>
            </thead>
            <tbody>
              {budget.courseTypeBudgets.map((typeBudget, index) => {
                const spent = expensesByType[typeBudget.type] || 0;
                const remaining = typeBudget.amount - spent;
                const percentage = (spent / typeBudget.amount) * 100;
                
                return (
                  <tr key={index}>
                    <td>{typeBudget.type}</td>
                    <td>¥{typeBudget.amount.toLocaleString('zh-CN')}</td>
                    <td>¥{spent.toLocaleString('zh-CN')}</td>
                    <td>¥{remaining.toLocaleString('zh-CN')}</td>
                    <td>{percentage.toFixed(1)}%</td>
                  </tr>
                );
              })}
              <tr className="font-bold">
                <td>总计</td>
                <td>¥{budget.totalBudget.toLocaleString('zh-CN')}</td>
                <td>¥{Object.values(expensesByType).reduce((a, b) => a + b, 0).toLocaleString('zh-CN')}</td>
                <td>¥{(budget.totalBudget - Object.values(expensesByType).reduce((a, b) => a + b, 0)).toLocaleString('zh-CN')}</td>
                <td>{((Object.values(expensesByType).reduce((a, b) => a + b, 0) / budget.totalBudget) * 100).toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {expenses.length > 0 && (
        <div className="card">
          <h2 className="text-heading-2 mb-6">支出记录</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>日期</th>
                  <th>课程类型</th>
                  <th>金额</th>
                  <th>描述</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>{expense.type}</td>
                    <td>¥{expense.amount.toLocaleString('zh-CN')}</td>
                    <td>{expense.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}