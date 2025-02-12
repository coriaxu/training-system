import { Expense } from '@/types/budget';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

interface StatisticsProps {
  expenses: Expense[];
}

export default function Statistics({ expenses }: StatisticsProps) {
  // 按月份统计支出
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = expense.date.substring(0, 7); // 获取 YYYY-MM 格式
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount
  }));

  // 按类型统计支出
  const typeData = expenses.reduce((acc, expense) => {
    acc[expense.type] = (acc[expense.type] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(typeData).map(([type, value]) => ({
    type: type === 'training' ? '培训费用' : 
          type === 'travel' ? '差旅费用' : '其他费用',
    value
  }));

  const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card">
        <h3 className="text-heading-3 mb-4">月度支出趋势</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `¥${value.toLocaleString()}`}
              />
              <Bar dataKey="amount" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 className="text-heading-3 mb-4">支出类型占比</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => 
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `¥${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 