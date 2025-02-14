'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Budget as BudgetType, Expense as ExpenseType, BudgetFormData } from '@/types/budget';
import BudgetCards from '@/app/components/budget/BudgetCards';
import BudgetCharts from '@/app/components/budget/BudgetCharts';
import ExpenseList from '@/app/components/budget/ExpenseList';
import ExpenseDialog from '@/app/components/budget/ExpenseDialog';

interface Expense {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export default function BudgetPage() {
  // 修复：在初始化 budget 时补上 month 字段（默认值为空字符串）
  const [budget, setBudget] = useState<BudgetFormData>({
    month: '',
    totalBudget: 0,
    notes: '',
    courseTypeBudgets: []
  });
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseType | null>(null);
  const [expensesByType, setExpensesByType] = useState<Record<string, number>>({});
  const [totalExpense, setTotalExpense] = useState(0);

  // 加载预算和支出数据
  const loadData = async () => {
    try {
      setLoading(true);
      const [budgetRes, expenseRes] = await Promise.all([
        fetch('/api/budget'),
        fetch('/api/expense'),
      ]);

      if (!budgetRes.ok) throw new Error('获取预算数据失败');
      if (!expenseRes.ok) throw new Error('获取支出数据失败');

      const [budgetData, expenseData] = await Promise.all([
        budgetRes.json(),
        expenseRes.json(),
      ]);

      setBudget(budgetData);
      setExpenses(expenseData);
      setError(null);
    } catch (err) {
      console.error('加载数据失败：', err);
      setError('加载数据失败，请刷新页面重试');
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadData();
  }, []);

  // 计算支出统计数据
  const calculateExpenseStats = useCallback(() => {
    const typeStats = expenses.reduce((acc, expense) => {
      acc[expense.type] = (acc[expense.type] || 0) + (expense.amount || 0);
      return acc;
    }, {} as Record<string, number>);

    const totalExpense = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
    
    return {
      expensesByType: typeStats,
      totalExpense
    };
  }, [expenses]);

  // 当支出数据变化时重新计算统计数据
  useEffect(() => {
    const stats = calculateExpenseStats();
    setExpensesByType(stats.expensesByType);
    setTotalExpense(stats.totalExpense);
  }, [expenses, calculateExpenseStats]);

  // 添加支出
  const handleAddExpense = async (data: any) => {
    try {
      const res = await fetch('/api/expense', {
        method: data.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(data.id ? '更新支出失败' : '添加支出失败');

      const newExpense = await res.json();
      
      // 更新本地状态
      if (data.id) {
        setExpenses(prevExpenses => 
          prevExpenses.map(e => e.id === data.id ? newExpense : e)
        );
      } else {
        setExpenses(prevExpenses => [...prevExpenses, newExpense]);
      }

      setIsExpenseDialogOpen(false);
      setSelectedExpense(null);
    } catch (err) {
      console.error('保存支出失败：', err);
      alert('保存支出失败，请重试');
    }
  };

  // 处理编辑支出
  const handleEditExpense = (expense: ExpenseType) => {
    setSelectedExpense(expense);
    setIsExpenseDialogOpen(true);
  };

  // 处理删除支出
  const handleDeleteExpense = async (id: string) => {
    try {
      const expenseToDelete = expenses.find(e => e.id === id);
      if (!expenseToDelete) return;

      const res = await fetch(`/api/expense/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('删除支出失败');
      
      // 更新本地状态
      setExpenses(prevExpenses => prevExpenses.filter(e => e.id !== id));
      
      // 状态会通过 useEffect 自动更新
    } catch (err) {
      console.error('删除支出失败：', err);
      alert('删除支出失败，请重试');
    }
  };

  // 更新预算
  const handleUpdateBudget = async (updatedBudget: BudgetType) => {
    if (!budget.id) {
      console.error('更新预算时缺少 budget.id');
      return;
    }
    try {
      const response = await fetch(`/api/budget/${budget.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBudget),
      });

      if (!response.ok) throw new Error('更新预算失败');
      await loadData(); // 重新获取预算数据
    } catch (error) {
      console.error('更新预算失败:', error);
    }
  };

  // 删除预算
  const handleDeleteBudget = async (id: string) => {
    try {
      const response = await fetch(`/api/budget/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('删除预算失败');
      await loadData(); // 重新获取预算数据
    } catch (error) {
      console.error('删除预算失败:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[95%] mx-auto py-8">
      {budget && (
        <>
          <BudgetCards
            budget={budget}
            expenses={expenses}
            onUpdate={handleUpdateBudget}
            onDelete={handleDeleteBudget}
          />
          <BudgetCharts budget={budget} expensesByType={expensesByType} />
          <ExpenseList 
            expenses={expenses} 
            onAddExpense={() => setIsExpenseDialogOpen(true)}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
          <ExpenseDialog
            isOpen={isExpenseDialogOpen}
            onClose={() => {
              setIsExpenseDialogOpen(false);
              setSelectedExpense(null);
            }}
            onSubmit={handleAddExpense}
            expense={selectedExpense}
            budget={budget}
          />
        </>
      )}
    </div>
  );
}