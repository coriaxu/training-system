import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrainingRecord } from '../../lib/storage';

interface ParticipantsTrendProps {
  data: TrainingRecord[];
}

export function ParticipantsTrend({ data }: ParticipantsTrendProps) {
  // 1. 先按日期分组
  const groupedData = data.reduce((acc, record) => {
    const dateStr = record.startDate;
    if (!dateStr) return acc;

    const date = dateStr.split('T')[0];
    if (!acc[date]) {
      acc[date] = { participants: 0, count: 0 };
    }
    acc[date].participants += record.participants;
    acc[date].count += 1;
    return acc;
  }, {} as Record<string, { participants: number; count: number }>);

  // 2. 把分组结果映射成一个数组，每个元素包含 date、participants、count 等字段
  const chartData = Object.entries(groupedData)
    .map(([date, values]) => ({
      date, // "2025-01-10" 这样的字符串
      participants: values.participants,
      count: values.count,
    }))
    // 3. 直接用 date 排序
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* X轴直接用 chartData 里的 date 字段 */}
          <XAxis
            dataKey="date"
            // 只显示月-日
            tickFormatter={(value) => value.split('-').slice(1).join('/')}
          />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`${value} 人`, '参训人数']}
            labelFormatter={(label) => `${label} 日`}
          />
          <Line
            type="monotone"
            dataKey="participants"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6' }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
