'use client';

import { useState } from 'react';
import { useCompletion } from 'ai/react';
import { TrainingRecord } from '../lib/storage';
import { Loader2, Lightbulb } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface AIInsightsProps {
  data: TrainingRecord[];
}

export default function AIInsights({ data }: AIInsightsProps) {
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInsights = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await generateTrainingInsights(data);
      setInsights(result);
    } catch (err) {
      setError('生成洞察报告时出错，请稍后重试');
      console.error('Error generating insights:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">AI 培训洞察</h3>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGenerateInsights}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>生成中...</span>
            </>
          ) : (
            <>
              <Lightbulb className="h-4 w-4" />
              <span>生成洞察</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {insights ? (
        <div className="prose prose-sm max-w-none">
          <MarkdownRenderer content={insights} />
        </div>
      ) : !loading && !error ? (
        <div className="text-center py-12 text-gray-500">
          点击"生成洞察"按钮，AI 将分析您的培训数据并生成见解报告
        </div>
      ) : null}
    </div>
  );
}
