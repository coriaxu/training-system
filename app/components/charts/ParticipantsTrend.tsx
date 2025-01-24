'use client';

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
  // 按日期对数据进行分组和聚合
  const aggregatedData = data.reduce((acc, record) => {
    const date = record.date.split('T')[0];
    if (!acc[date]) {
      acc[date] = { date, participants: 0 };
    }
    acc[date].participants += record.participants;
    return acc;
  }, {} as Record<string, { date: string; participants: number }>);

  // 转换为数组并按日期排序
  const chartData = Object.values(aggregatedData).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <LineChart
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
