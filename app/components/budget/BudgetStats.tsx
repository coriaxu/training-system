'use client';

import { useEffect, useState } from 'react';
import { BudgetData, getBudgetByMonth } from '@/app/lib/budgetStorage';
import { getExpenses } from '@/app/lib/expenseStorage';
import { Expense } from '@/types/budget';

export function BudgetStats() {
  const [currentBudget, setCurrentBudget] = useState<BudgetData | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const budget = getBudgetByMonth(currentMonth);
    const expenseRecords = getExpenses();
    
    setCurrentBudget(budget);
    setExpenses(expenseRecords.filter(e => e.date.startsWith(currentMonth)));
  }, []); // 修改依赖项为空数组

  const calculateExpensesByType = () => {
    const expensesByType: Record<string, number> = {};
    expenses.forEach(expense => {
      expensesByType[expense.budgetType] = (expensesByType[expense.budgetType] || 0) + expense.amount;
    });
    return expensesByType;
  };

  const expensesByType = calculateExpensesByType();

  if (!currentBudget || !currentBudget.courseTypeBudgets || !Array.isArray(currentBudget.courseTypeBudgets)) {
    return (
      <div className="text-center text-gray-500 py-8">
        尚未设置本月预算
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 总预算使用情况 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentBudget.courseTypeBudgets.map(budget => {
          const used = expensesByType[budget.type] || 0;
          const percentage = budget.amount > 0 ? (used / budget.amount) * 100 : 0;

          return (
            <div key={budget.type} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-500">{budget.type}</h3>
              <div className="mt-2 flex justify-between items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  ¥{used.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  预算: ¥{budget.amount.toFixed(2)}
                </p>
              </div>
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 rounded-full ${percentage >= 100 ? 'bg-red-500' : 'bg-primary'}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 text-right">
                  {percentage.toFixed(1)}% 已使用
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {currentBudget.notes && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">备注：</span>
            {currentBudget.notes}
          </p>
        </div>
      )}
    </div>
  );
}