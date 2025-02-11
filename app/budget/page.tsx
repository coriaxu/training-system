'use client';

import { useState, useEffect } from 'react';
import { getBudgetByMonth, saveBudgetData } from '@/lib/budgetStorage';
import BudgetOverview from '@/components/budget/BudgetOverview';
import ExpenseForm from '@/components/budget/ExpenseForm';
import ExpenseTable from '@/components/budget/ExpenseTable';
import { Budget, BudgetFormData } from '@/types/budget';

const BUDGET_STORAGE_KEY = 'training_budgets_v1';

export default function BudgetPage() {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载预算数据
  useEffect(() => {
    const loadBudgetData = () => {
      try {
        setLoading(true);
        const currentMonth = new Date().toISOString().slice(0, 7);
        const budgetData = getBudgetByMonth(currentMonth);
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

    loadBudgetData();

    // 监听其他标签页的数据变更
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === BUDGET_STORAGE_KEY) {
        console.log('检测到数据变更，重新加载');
        loadBudgetData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 保存预算数据
  const handleSaveBudget = async (data: BudgetFormData) => {
    try {
      const savedBudget = saveBudgetData(data);
      console.log('保存预算成功：', savedBudget);
      setBudget(savedBudget);
      return true;
    } catch (err) {
      console.error('保存预算失败：', err);
      setError('保存预算失败，请重试');
      return false;
    }
  };

  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  // 如果有错误，显示错误信息
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card bg-red-50 border border-red-200">
          <div className="text-red-600 text-center">
            <p className="text-lg font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              重新加载
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* 标题和操作区 */}
        <div className="flex justify-between items-center">
          <h1 className="text-heading-1">培训预算管理</h1>
          <div className="space-x-4">
            <button 
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              刷新数据
            </button>
          </div>
        </div>

        {/* 预算总览 */}
        <BudgetOverview budget={budget} />

        {/* 预算表单和明细 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseForm onSubmit={handleSaveBudget} />
          <ExpenseTable budget={budget} />
        </div>
      </div>
    </div>
  );
}