'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { BUDGET_TYPES } from '@/app/lib/constants';
import { Budget, BudgetFormData } from '@/types/budget';

interface BudgetSettingFormProps {
  onClose: () => void;
  onSubmit: (data: { month: string; courseTypeBudgets: { type: string; amount: number }[] }) => void;
}

export function BudgetSettingForm({ onClose, onSubmit }: BudgetSettingFormProps) {
  const [formData, setFormData] = useState({
    month: new Date().toISOString().split('-').slice(0, 2).join('-'),
    budgets: Object.fromEntries(
      BUDGET_TYPES.map(type => [type, 0])
    ) as Record<string, number>
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const courseTypeBudgets = Object.entries(formData.budgets).map(([type, amount]) => ({
      type,
      amount
    }));

    onSubmit({ 
      month: formData.month,
      courseTypeBudgets
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" onClick={onClose} />

        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            设置本月预算
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                预算月份
              </label>
              <input
                type="month"
                value={formData.month}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    month: e.target.value
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            {BUDGET_TYPES.map((type) => (
              <div key={type}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {type}预算
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.budgets[type]} 
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      budgets: {
                        ...formData.budgets,
                        [type]: parseFloat(e.target.value) || 0, 
                      },
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  required
                />
              </div>
            ))}

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}