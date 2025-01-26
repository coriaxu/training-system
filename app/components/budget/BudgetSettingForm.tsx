'use client';

import { useState } from 'react';
import { Budget, CourseTypeBudget } from '@/types/budget';
import { saveBudgetData } from '@/app/lib/budgetStorage';

interface BudgetSettingFormProps {
  currentBudget: Budget;
  onClose: () => void;
  onSave: (budget: Budget) => void;
}

export function BudgetSettingForm({ currentBudget, onClose, onSave }: BudgetSettingFormProps) {
  const [courseTypeBudgets, setCourseTypeBudgets] = useState<CourseTypeBudget[]>(
    currentBudget.courseTypeBudgets
  );
  const [warningThreshold, setWarningThreshold] = useState(currentBudget.warningThreshold);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const total = courseTypeBudgets.reduce((sum, item) => sum + item.amount, 0);
    const newBudget: Budget = {
      total,
      used: currentBudget.used,
      remaining: total - currentBudget.used,
      warningThreshold,
      courseTypeBudgets
    };

    // 保存到数据库
    await saveBudgetData(newBudget);
    onSave(newBudget);
  };

  const handleAddCourseType = () => {
    setCourseTypeBudgets([
      ...courseTypeBudgets,
      { type: '', amount: 0 }
    ]);
  };

  const handleRemoveCourseType = (index: number) => {
    setCourseTypeBudgets(courseTypeBudgets.filter((_, i) => i !== index));
  };

  const handleCourseTypeChange = (index: number, field: keyof CourseTypeBudget, value: string | number) => {
    const newBudgets = [...courseTypeBudgets];
    newBudgets[index] = {
      ...newBudgets[index],
      [field]: field === 'amount' ? Number(value) : value
    };
    setCourseTypeBudgets(newBudgets);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-6">预算设置</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 预警阈值设置 */}
          <div>
            <label className="block text-sm font-medium mb-2">
              预算预警阈值 (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={warningThreshold}
              onChange={(e) => setWarningThreshold(Number(e.target.value))}
              className="input input-bordered w-full"
            />
          </div>

          {/* 课程类型预算列表 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">课程类型预算</h3>
              <button
                type="button"
                onClick={handleAddCourseType}
                className="btn btn-secondary btn-sm"
              >
                添加课程类型
              </button>
            </div>

            {courseTypeBudgets.map((budget, index) => (
              <div key={index} className="flex gap-4 items-center">
                <input
                  type="text"
                  value={budget.type}
                  onChange={(e) => handleCourseTypeChange(index, 'type', e.target.value)}
                  placeholder="课程类型"
                  className="input input-bordered flex-1"
                />
                <input
                  type="number"
                  value={budget.amount}
                  onChange={(e) => handleCourseTypeChange(index, 'amount', e.target.value)}
                  placeholder="预算金额"
                  className="input input-bordered w-32"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCourseType(index)}
                  className="btn btn-error btn-sm"
                >
                  删除
                </button>
              </div>
            ))}
          </div>

          {/* 按钮组 */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              取消
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}