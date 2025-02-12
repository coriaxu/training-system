'use client';

import { Budget } from '@/types/budget';
import { useEffect, useState } from 'react';

interface BudgetOverviewProps {
  budget: Budget | null;
}

export default function BudgetOverview({ budget }: BudgetOverviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 在服务端渲染时返回占位内容
  if (typeof window === 'undefined' || !mounted || !budget) {
    return (
      <div className="card animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="stat-card">
              <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="h-2 w-full bg-gray-200 rounded"></div>
      </div>
    );
  }

  const totalBudget = budget.totalBudget;
  const usedBudget = budget.courseTypeBudgets.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = totalBudget - usedBudget;
  const warningThreshold = 80; // 默认警告阈值

  const usagePercentage = (usedBudget / totalBudget) * 100;
  const isWarning = usagePercentage >= warningThreshold;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-heading-2">预算概览</h2>
        <span className="text-sm text-gray-500">{budget.month}</span>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="space-y-2">
          <span className="text-sm text-gray-500">总预算</span>
          <div className="stat-value">
            ¥{totalBudget.toLocaleString('zh-CN')}
          </div>
          <span className="text-xs text-gray-400">本月可用预算总额</span>
        </div>
        <div className="space-y-2">
          <span className="text-sm text-gray-500">已分配</span>
          <div className="stat-value">
            ¥{usedBudget.toLocaleString('zh-CN')}
          </div>
          <span className="text-xs text-gray-400">
            {((usedBudget / totalBudget) * 100).toFixed(1)}% 已规划
          </span>
        </div>
        <div className="space-y-2">
          <span className="text-sm text-gray-500">未分配</span>
          <div className="stat-value">
            ¥{remainingBudget.toLocaleString('zh-CN')}
          </div>
          <span className="text-xs text-gray-400">
            {((remainingBudget / totalBudget) * 100).toFixed(1)}% 待规划
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
        {isWarning ? (
          <p className="text-sm text-orange-500 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            预算使用接近上限，请注意控制支出
          </p>
        ) : (
          <p className="text-sm text-green-500 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            预算使用情况良好，继续保持
          </p>
        )}
      </div>
    </div>
  );
}