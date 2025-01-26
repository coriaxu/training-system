'use client';

import { useEffect, useState } from 'react';
import BudgetOverview from '@/components/budget/BudgetOverview';
import ExpenseForm from '@/components/budget/ExpenseForm';
import ExpenseTable from '@/components/budget/ExpenseTable';
import Statistics from '@/components/budget/Statistics';
import { BudgetSettingForm } from '@/app/components/budget/BudgetSettingForm';
import { Budget, Expense, ExpenseFormData } from '@/types/budget';
import { v4 as uuidv4 } from 'uuid';
import { getBudgetByMonth, saveBudgetData } from '@/app/lib/budgetStorage';
import { getExpenses } from '@/app/lib/expenseStorage';

// 默认预算数据
const defaultBudget: Budget = {
  total: 0,
  used: 0,
  remaining: 0,
  warningThreshold: 80,
  courseTypeBudgets: []
};

export default function BudgetPage() {
  const [budget, setBudget] = useState<Budget>(defaultBudget);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [budgetFormOpen, setBudgetFormOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 加载初始数据
  useEffect(() => {
    const loadInitialData = async () => {
      const currentMonth = new Date().toISOString().slice(0, 7);
      const budgetData = await getBudgetByMonth(currentMonth);
      const expensesData = await getExpenses();
      
      if (budgetData) {
        setBudget(budgetData); // budgetData 现在已经是正确的 Budget 类型
      }

      if (expensesData) {
        const currentMonthExpenses = expensesData.filter(
          (e: Expense) => e.date.startsWith(currentMonth)
        );
        setExpenses(currentMonthExpenses);
      }
    };

    loadInitialData();
  }, []);

  // 处理添加支出
  const handleAddExpense = async (data: ExpenseFormData) => {
    const newExpense: Expense = {
      id: uuidv4(),
      ...data,
      createdAt: new Date().toISOString()
    };

    // 更新预算使用情况
    const updatedBudget = {
      ...budget,
      used: budget.used + data.amount,
      remaining: budget.total - (budget.used + data.amount)
    };

    setBudget(updatedBudget);
    setExpenses([...expenses, newExpense]);
    setShowExpenseForm(false);
    
    // 显示成功消息
    showToastMessage('支出记录已添加');
  };

  // 处理删除支出
  const handleDeleteExpense = async (id: string) => {
    const expense = expenses.find(e => e.id === id);
    if (!expense) return;

    // 更新预算使用情况
    const updatedBudget = {
      ...budget,
      used: budget.used - expense.amount,
      remaining: budget.total - (budget.used - expense.amount)
    };

    setBudget(updatedBudget);
    setExpenses(expenses.filter(e => e.id !== id));
    
    // 显示成功消息
    showToastMessage('支出记录已删除');
  };

  const showToastMessage = (message: string) => {
    // 临时实现，后续可以替换成统一的toast组件
    alert(message);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">预算管理</h1>
        <div className="space-x-4">
          <button
            onClick={() => setBudgetFormOpen(true)}
            className="btn btn-primary"
          >
            设置预算
          </button>
          <button
            onClick={() => setShowExpenseForm(true)}
            className="btn btn-secondary"
          >
            添加支出
          </button>
        </div>
      </div>

      <BudgetOverview budget={budget} />
      
      <Statistics budget={budget} expenses={expenses} />
      
      <ExpenseTable 
        expenses={expenses} 
        onDelete={handleDeleteExpense}
        onEdit={setEditingExpense}
      />

      {showExpenseForm && (
        <ExpenseForm
          onSubmit={handleAddExpense}
          onCancel={() => setShowExpenseForm(false)}
          courseTypes={budget.courseTypeBudgets.map(b => b.type)}
        />
      )}

      {budgetFormOpen && (
        <BudgetSettingForm
          currentBudget={budget}
          onClose={() => setBudgetFormOpen(false)}
          onSave={async (newBudget) => {
            setBudget(newBudget);
            setBudgetFormOpen(false);
            showToastMessage('预算设置已更新');
          }}
        />
      )}
    </div>
  );
}