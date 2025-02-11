'use client';

interface Suggestion {
  title: string;
  items: string[];
}

const suggestions: Suggestion[] = [
  {
    title: "提高培训效率",
    items: [
      "增加每期培训的时长",
      "增加培训场次和参训人数"
    ]
  },
  {
    title: "优化资源利用",
    items: [
      "充分利用培训资源",
      "合理安排培训时间和场地"
    ]
  },
  {
    title: "课程规划优化",
    items: [
      "定期评估各课程的实际需求和效果",
      "确保课程类型分布符合员工需求"
    ]
  },
  {
    title: "数据跟踪建议",
    items: [
      "持续跟踪月度培训数据",
      "分析长期趋势，及时调整培训策略"
    ]
  }
];

export default function OptimizationSuggestions() {
  return (
    <div className="card space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
        <h2 className="text-heading-2">培训优化建议</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index}
            className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500 text-white font-medium">
                {index + 1}
              </span>
              <h3 className="text-heading-3">{suggestion.title}</h3>
            </div>
            <ul className="space-y-3 ml-11">
              {suggestion.items.map((item, itemIndex) => (
                <li 
                  key={itemIndex}
                  className="flex items-start space-x-2 text-gray-600 dark:text-gray-300"
                >
                  <svg 
                    className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-sm text-gray-600 dark:text-gray-300">
        <p className="flex items-center space-x-2">
          <svg 
            className="w-5 h-5 text-blue-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span>
            通过以上分析和建议，可以有效提升培训效率和资源利用，确保培训内容与员工需求相匹配，从而提升整体培训效果。
          </span>
        </p>
      </div>
    </div>
  );
} 