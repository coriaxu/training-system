'use client';

import { BudgetData } from '@/app/lib/budgetStorage';
import { Expense } from '@/app/lib/expenseStorage';

interface ReportTableProps {
  month: string;
  budget: BudgetData | null;
  expenses: Expense[];
}

interface ReportData {
  budgetType: string;
  budgetAmount: number;
  actualExpense: number;
  remainingBudget: number;
  executionRate: number;
}

export function ReportTable({ month, budget, expenses }: ReportTableProps) {
  const calculateReportData = (): ReportData[] => {
    const budgetTypes = ['日常培训开销', '特殊项目开销'];
    return budgetTypes.map(type => {
      const budgetAmount = budget?.courseTypeBudgets.find(b => b.type === type)?.amount || 0;
      const actualExpense = expenses
        .filter(e => e.budgetType === type)
        .reduce((sum, expense) => sum + expense.amount, 0);
      const remainingBudget = budgetAmount - actualExpense;
      const executionRate = budgetAmount > 0 ? (actualExpense / budgetAmount) * 100 : 0;

      return {
        budgetType: type,
        budgetAmount,
        actualExpense,
        remainingBudget,
        executionRate
      };
    });
  };

  const reportData = calculateReportData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">月度预算执行情况报表</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                预算科目
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                预算金额
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                实际开销
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                剩余预算
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                预算执行率
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reportData.map((data, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {data.budgetType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(data.budgetAmount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(data.actualExpense)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(data.remainingBudget)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {data.executionRate.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!budget || expenses.length === 0) && (
          <div className="p-6 text-center text-sm text-gray-500">
            {!budget ? '当前月份暂无预算数据，请先进行预算设置' : '当前月份暂无费用记录，请添加费用记录'}
          </div>
        )}
      </div>
      <div className="text-sm text-gray-500 text-right">
        数据截止至：{new Date().toLocaleDateString('zh-CN')}
      </div>
    </div>
  );
}