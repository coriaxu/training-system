'use client';

import { useEffect, useState } from 'react';
import { prisma } from '@/app/lib/db';
import { TrainingRecord } from '@/types/training';

export default function OptimizationSuggestions() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const analyzeTrainings = async () => {
      const trainings = await prisma.training.findMany();
      const analyzedSuggestions = generateSuggestions(trainings);
      setSuggestions(analyzedSuggestions);
    };

    analyzeTrainings();
  }, []);

  const generateSuggestions = (trainings: TrainingRecord[]): string[] => {
    const suggestions: string[] = [];

    // 分析培训时长
    const avgDuration = trainings.reduce((sum, t) => sum + t.duration, 0) / trainings.length;
    if (avgDuration > 120) {
      suggestions.push('培训平均时长超过2小时，建议适当缩短单次培训时间，保持学员注意力。');
    }

    // 分析培训频率
    if (trainings.length >= 2) {
      const sortedDates = trainings
        .map(t => new Date(t.startDate).getTime())
        .sort((a, b) => a - b);
      
      const intervals = [];
      for (let i = 1; i < sortedDates.length; i++) {
        intervals.push(sortedDates[i] - sortedDates[i-1]);
      }
      
      const avgInterval = intervals.reduce((sum, i) => sum + i, 0) / intervals.length;
      const daysInterval = Math.floor(avgInterval / (1000 * 60 * 60 * 24));
      
      if (daysInterval < 7) {
        suggestions.push('培训间隔较短，建议适当增加培训间隔，让学员有足够时间消化所学内容。');
      } else if (daysInterval > 30) {
        suggestions.push('培训间隔较长，建议适当增加培训频率，保持学习的连续性。');
      }
    }

    // 分析培训类型分布
    const typeCount = trainings.reduce((acc, t) => {
      acc[t.type] = (acc[t.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const types = Object.keys(typeCount);
    if (types.length === 1) {
      suggestions.push('培训类型单一，建议多样化培训内容，平衡不同类型的培训。');
    }

    // 如果没有发现问题，给出积极的反馈
    if (suggestions.length === 0) {
      suggestions.push('目前的培训安排合理，建议继续保持！');
    }

    return suggestions;
  };

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion, index) => (
        <div key={index} className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-gray-700">{suggestion}</p>
        </div>
      ))}
    </div>
  );
}
