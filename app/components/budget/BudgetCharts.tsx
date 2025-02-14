import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Budget, BudgetFormData } from '@/types/budget';

ChartJS.register(ArcElement, Tooltip, Legend);

interface BudgetChartsProps {
  budget: BudgetFormData;
  expensesByType: Record<string, number>;
}

export default function BudgetCharts({ budget, expensesByType }: BudgetChartsProps) {
  const colors = {
    '日常培训': '#0F4264',
    '专项培训': '#10B981',
    '特殊项目': '#F59E0B',
  };

  // 使用 useMemo 优化数据计算
  const { chartData, budgetProgress } = useMemo(() => {
    // 按固定顺序排序
    const orderedTypes = ['日常培训', '专项培训', '特殊项目'];
    const sortedBudgets = budget.courseTypeBudgets
      .slice()
      .sort((a, b) => orderedTypes.indexOf(a.type) - orderedTypes.indexOf(b.type));

    return {
      chartData: {
        labels: sortedBudgets.map((b) => b.type),
        datasets: [
          {
            data: sortedBudgets.map((b) => b.amount ?? 0),
            backgroundColor: sortedBudgets.map((b) => colors[b.type as keyof typeof colors]),
            borderWidth: 0,
          },
        ],
      },
      budgetProgress: sortedBudgets.map((typeBudget) => ({
        type: typeBudget.type,
        spent: expensesByType[typeBudget.type] ?? 0,
        total: typeBudget.amount ?? 0,
        percentage: Math.min(
          ((expensesByType[typeBudget.type] ?? 0) / (typeBudget.amount ?? 1)) * 100,
          100
        ),
      })),
    };
  }, [budget.courseTypeBudgets, expensesByType]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `¥${value.toLocaleString('zh-CN')}`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* 预算分配图表 */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-6 text-lg font-semibold text-[#0F4264]">预算分配</h3>
        <div className="flex flex-col items-center">
          <div className="relative h-[280px] w-[280px]">
            <Doughnut data={chartData} options={options} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-sm text-gray-600">总预算</div>
              <div className="text-2xl font-bold text-[#0F4264]">
                ¥{(budget.totalBudget ?? 0).toLocaleString('zh-CN')}
              </div>
            </div>
          </div>
          <div className="mt-6 w-full space-y-2">
            {chartData.labels.map((label, index) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div
                    className="mr-2 h-3 w-3 rounded-full"
                    style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                  />
                  <span className="text-gray-700">{label}</span>
                </div>
                <span className="font-medium text-gray-900">
                  ¥{(budget.courseTypeBudgets[index]?.amount ?? 0).toLocaleString('zh-CN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 预算使用进度 */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-6 text-lg font-semibold text-[#0F4264]">预算使用进度</h3>
        <div className="space-y-6">
          {budgetProgress.map(({ type, spent, total, percentage }) => (
            <div key={type}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-gray-700">{type}</span>
                <span className="text-gray-600">
                  ¥{spent.toLocaleString('zh-CN')} / ¥{total.toLocaleString('zh-CN')}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-[#0F4264] transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
