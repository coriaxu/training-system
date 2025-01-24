'use client';

import { Budget } from '@/types/budget';
import { useEffect, useState } from 'react';

interface BudgetOverviewProps {
  budget: Budget | undefined; // 修改类型定义，允许 budget prop 为 undefined
}

export default function BudgetOverview({ budget }: BudgetOverviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 在服务端渲染时返回占位内容
  if (typeof window === 'undefined' || !mounted) {
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

  // 检查 budget 是否存在，以及 total, used, remaining 属性是否存在
  const total = budget?.total !== undefined ? budget.total : 0;
  const used = budget?.used !== undefined ? budget.used : 0;
  const remaining = budget?.remaining !== undefined ? budget.remaining : 0;
  const warningThreshold = budget?.warningThreshold !== undefined ? budget.warningThreshold : 80; // 默认 warningThreshold

  const usagePercentage = (used / total) * 100;
  const isWarning = usagePercentage >= warningThreshold;

  return (
    <div className="card">
      <h2 className="text-heading-2 mb-6">预算总览</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <span className="stat-title">总预算</span>
          <span className="stat-value">¥{total.toLocaleString('zh-CN')}</span>
        </div>
        <div className="stat-card">
          <span className="stat-title">已使用</span>
          <span className="stat-value text-primary">
            ¥{used.toLocaleString('zh-CN')}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-title">剩余</span>
          <span className="stat-value text-secondary">
            ¥{remaining.toLocaleString('zh-CN')}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
        {isWarning && (
          <p className="text-sm text-red-500">
            警告：预算使用已超过{warningThreshold}%
          </p>
        )}
      </div>
    </div>
  );
}