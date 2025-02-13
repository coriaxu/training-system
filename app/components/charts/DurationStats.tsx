'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrainingRecord } from '../../lib/storage';

interface DurationStatsProps {
  data: TrainingRecord[];
}

export function DurationStats({ data }: DurationStatsProps) {
  // 按日期对数据进行分组和聚合
  const aggregatedData = data.reduce((acc, record) => {
    const dateStr = record.startDate;
    if (!dateStr) return acc;
    
    const date = dateStr.split('T')[0];
    if (!acc[date]) {
      acc[date] = { date, duration: 0 };
    }
    acc[date].duration += record.duration;
    return acc;
  }, {} as Record<string, { date: string; duration: number }>);

  // 转换为数组并按日期排序
  const chartData = Object.values(aggregatedData).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => value.split('-').slice(1).join('/')}
          />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`${value} 小时`, '培训时长']}
            labelFormatter={(label) => `${label} 日`}
          />
          <Bar
            dataKey="duration"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
