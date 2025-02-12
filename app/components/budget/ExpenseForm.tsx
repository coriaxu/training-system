'use client';

import { useState } from 'react';
import { BudgetFormData, CourseTypeBudget } from '@/types/budget';
import { validateBudgetForm } from '@/lib/validation';

interface ExpenseFormProps {
  onSave: (data: BudgetFormData) => Promise<boolean>;
  budget: BudgetFormData | null;
}

export default function ExpenseForm({ onSave, budget }: ExpenseFormProps) {
  const [formData, setFormData] = useState<BudgetFormData>({
    month: new Date().toISOString().slice(0, 7),
    totalBudget: budget?.totalBudget || 0,
    courseTypeBudgets: budget?.courseTypeBudgets || [
      { type: '日常培训', amount: 0 },
      { type: '专项培训', amount: 0 },
      { type: '特殊项目', amount: 0 }
    ],
    notes: budget?.notes || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    const error = validateBudgetForm(formData);
    if (error) {
      alert(error);
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await onSave(formData);
      if (success) {
        // 重置表单
        setFormData({
          month: new Date().toISOString().slice(0, 7),
          totalBudget: 0,
          courseTypeBudgets: [
            { type: '日常培训', amount: 0 },
            { type: '专项培训', amount: 0 },
            { type: '特殊项目', amount: 0 }
          ],
          notes: ''
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCourseTypeAmountChange = (index: number, amount: number) => {
    const newCourseTypeBudgets = [...formData.courseTypeBudgets];
    newCourseTypeBudgets[index] = {
      ...newCourseTypeBudgets[index],
      amount
    };
    
    // 更新总预算
    const totalBudget = newCourseTypeBudgets.reduce((sum, item) => sum + item.amount, 0);
    
    setFormData({
      ...formData,
      courseTypeBudgets: newCourseTypeBudgets,
      totalBudget
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-heading-2">设置预算</h2>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            预算月份
          </label>
          <input
            type="month"
            className="form-input"
            value={formData.month}
            onChange={e => setFormData({ ...formData, month: e.target.value })}
            required
          />
        </div>

        {formData.courseTypeBudgets.map((typeBudget, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {typeBudget.type}预算
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
              <input
                type="number"
                className="form-input pl-8"
                value={typeBudget.amount}
                onChange={e => handleCourseTypeAmountChange(index, Number(e.target.value))}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            总预算
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
            <input
              type="number"
              className="form-input pl-8 bg-gray-50 dark:bg-gray-700"
              value={formData.totalBudget}
              disabled
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            备注说明
          </label>
          <textarea
            className="form-input h-24 resize-none"
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            placeholder="添加预算相关说明..."
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              保存中...
            </span>
          ) : '保存预算'}
        </button>
      </div>
    </form>
  );
}