'use client';

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts';
import { TrainingRecord } from '@/app/lib/storage';

interface DurationStatsProps {
  data: TrainingRecord[];
}

export function DurationStats({ data }: DurationStatsProps) {
  // 按日期对数据进行分组和聚合
  const aggregatedData = data.reduce((acc, record) => {
    // 假设 record.startDate 是 ISO 格式字符串
    const dateStr = record.startDate ? new Date(record.startDate).toISOString().split('T')[0] : '未知日期';
    if (!acc[dateStr]) {
      acc[dateStr] = { date: dateStr, duration: 0 };
    }
    acc[dateStr].duration += record.duration;
    return acc;
  }, {} as Record<string, { date: string; duration: number }>);

  // 将聚合结果转换为数组，并按日期排序
  const chartData = Object.values(aggregatedData).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(value) => value.split('-').slice(1).join('/')} />
          <YAxis />
          <Tooltip formatter={(value: number) => `${value} 小时`} labelFormatter={(label) => `${label} 日`} />
          <Line type="monotone" dataKey="duration" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8' }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
