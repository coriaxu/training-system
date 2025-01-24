import { TrainingRecord } from '../lib/storage';

export async function generateTrainingInsights(records: TrainingRecord[]) {
  const prompt = generateInsightPrompt(records);

  try {
    const response = await fetch('/api/insights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Failed to generate insights:', error);
    throw error;
  }
}

function generateInsightPrompt(records: TrainingRecord[]) {
  // 计算基础统计数据
  const totalSessions = records.length;
  const totalParticipants = records.reduce((sum, r) => sum + r.participants, 0);
  const totalDuration = records.reduce((sum, r) => sum + r.duration, 0);
  const avgParticipants = totalSessions > 0 ? totalParticipants / totalSessions : 0;

  // 按课程类型分组
  const courseTypeStats = records.reduce((acc, record) => {
    acc[record.courseType] = (acc[record.courseType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 按月份分组
  const monthlyStats = records.reduce((acc, record) => {
    const month = record.date.substring(0, 7); // YYYY-MM
    if (!acc[month]) {
      acc[month] = {
        sessions: 0,
        participants: 0,
        duration: 0,
      };
    }
    acc[month].sessions++;
    acc[month].participants += record.participants;
    acc[month].duration += record.duration;
    return acc;
  }, {} as Record<string, { sessions: number; participants: number; duration: number }>);

  return `
请分析以下培训数据并提供专业的洞察和建议：

基础数据：
- 总培训场次：${totalSessions}场
- 总参训人数：${totalParticipants}人
- 总培训时长：${totalDuration}小时
- 平均每期参训人数：${avgParticipants.toFixed(1)}人

课程类型分布：
${Object.entries(courseTypeStats)
  .map(([type, count]) => `- ${type}: ${count}场 (${((count / totalSessions) * 100).toFixed(1)}%)`)
  .join('\n')}

月度培训情况：
${Object.entries(monthlyStats)
  .map(
    ([month, stats]) =>
      `- ${month}: ${stats.sessions}场培训，${stats.participants}人参训，共${stats.duration}小时`
  )
  .join('\n')}

请从以下几个方面进行分析：
1. 培训效率和资源利用
2. 课程类型分布的合理性
3. 培训规模的趋势
4. 需要改进的地方
5. 具体的优化建议

请用中文回答，使用简洁专业的语言，突出重点发现和可行的建议。
`;
}
