'use client';

import { useState, useEffect } from 'react';
import BudgetOverview from '@/components/budget/BudgetOverview';
import ExpenseForm from '@/components/budget/ExpenseForm';
import ExpenseTable from '@/components/budget/ExpenseTable';
import { Budget, BudgetFormData } from '@/types/budget';

export default function BudgetPage() {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载预算数据
  const loadBudgetData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/budget');
      if (!res.ok) throw new Error('获取预算数据失败');
      const budgetData = await res.json();
      console.log('加载预算数据：', budgetData);
      setBudget(budgetData);
      setError(null);
    } catch (err) {
      console.error('加载预算数据失败：', err);
      setError('加载预算数据失败，请刷新页面重试');
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadBudgetData();
  }, []);

  // 保存预算数据
  const handleSaveBudget = async (data: BudgetFormData): Promise<boolean> => {
    try {
      const res = await fetch('/api/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('保存预算失败');
      const savedBudget = await res.json();
      console.log('保存预算成功：', savedBudget);
      setBudget(savedBudget);
      return true;
    } catch (err) {
      console.error('保存预算失败：', err);
      setError('保存预算失败，请重试');
      return false;
    }
  };

  if (loading) {
    return <div className="p-4">加载中...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <ExpenseForm onSave={handleSaveBudget} budget={budget} />
        {budget && (
          <>
            <BudgetOverview budget={budget} />
            <ExpenseTable budget={budget} />
          </>
        )}
      </div>
    </div>
  );
}