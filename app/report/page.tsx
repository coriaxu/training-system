'use client';

import { useState } from 'react';
import { ReportTable } from '@/app/components/report/ReportTable';
import { ReportCharts } from '@/app/components/report/ReportCharts';
import { getBudgetByMonth } from '@/app/lib/budgetStorage';
import { getExpenses } from '@/app/lib/expenseStorage';

export default function ReportPage() {
  const currentMonth = new Date().toISOString().slice(0, 7); // 格式：YYYY-MM
  const budget = getBudgetByMonth(currentMonth);
  const allExpenses = getExpenses();
  const currentMonthExpenses = allExpenses.filter(expense => expense.date.startsWith(currentMonth));

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">报表统计</h1>
      </div>

      <div className="space-y-8">
        <ReportTable
          month={currentMonth}
          budget={budget}
          expenses={currentMonthExpenses}
        />

        <ReportCharts
          budget={budget}
          expenses={currentMonthExpenses}
        />
      </div>
    </div>
  );
}