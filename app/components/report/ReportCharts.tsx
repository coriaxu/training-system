'use client';

import { BudgetData } from '@/app/lib/budgetStorage';
import { ExpenseRecord } from '@/app/lib/expenseStorage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

interface ReportChartsProps {
  budget: BudgetData | null;
  expenses: ExpenseRecord[];
}

interface ChartData {
  budgetType: string;
  budgetAmount: number;
  actualExpense: number;
}

const COLORS = ['#2D71A1', '#0F4264'];

export function ReportCharts({ budget, expenses }: ReportChartsProps) {
  const calculateChartData = (): ChartData[] => {
    const budgetTypes = ['日常培训开销', '特殊项目开销'];
    return budgetTypes.map(type => {
      const budgetAmount = budget?.courseTypeBudgets.find(b => b.type === type)?.amount || 0;
      const actualExpense = expenses
        .filter(e => e.budgetType === type)
        .reduce((sum, expense) => sum + expense.amount, 0);

      return {
        budgetType: type,
        budgetAmount,
        actualExpense
      };
    });
  };

  const chartData = calculateChartData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const pieData = chartData.map(item => ({
    name: item.budgetType,
    value: item.actualExpense
  }));

  const totalExpense = pieData.reduce((sum, item) => sum + item.value, 0);

  if (!budget || expenses.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">图表展示</h2>
        <div className="p-6 text-center text-sm text-gray-500 bg-white rounded-lg shadow">
          {!budget ? '当前月份暂无预算数据，无法生成图表' : '当前月份暂无费用数据，无法生成图表'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">预算 vs 开销对比</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <BarChart
            width={600}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="budgetType" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip formatter={formatCurrency} />
            <Legend />
            <Bar dataKey="budgetAmount" name="预算金额" fill="#2D71A1" />
            <Bar dataKey="actualExpense" name="实际开销" fill="#0F4264" />
          </BarChart>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">费用科目占比</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx={200}
              cy={150}
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}