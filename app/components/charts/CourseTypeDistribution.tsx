'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrainingRecord } from '../../lib/storage';

interface CourseTypeDistributionProps {
  data: TrainingRecord[];
}

// 颜色配置
const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'];

export function CourseTypeDistribution({ data }: CourseTypeDistributionProps) {
  // 按课程类型对数据进行分组和统计
  const typeStats = data.reduce((acc, record) => {
    if (!acc[record.courseType]) {
      acc[record.courseType] = { count: 0, hours: 0 };
    }
    acc[record.courseType].count++;
    acc[record.courseType].hours += record.duration;
    return acc;
  }, {} as Record<string, { count: number; hours: number }>);

  // 转换为图表数据格式
  const chartData = Object.entries(typeStats).map(([name, stats]) => ({
    name,
    value: stats.count,
    hours: stats.hours,
  }));

  // 计算总数用于显示百分比
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
              name,
            }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
              const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string, props: any) => {
              const item = props.payload;
              return [
                `${value} 场 (${item.hours} 小时)`,
                item.name,
              ];
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
