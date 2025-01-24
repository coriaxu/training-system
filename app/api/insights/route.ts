import { NextResponse } from 'next/server';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    // 在开发环境中返回模拟数据
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        content: `# 培训数据分析报告

## 1. 培训效率和资源利用

- **人均培训时长**：平均每位参训人员为11.7人，培训时长总计18小时，平均每人培训时长为0.51小时，这表明培训效率有待提高。
- **资源利用率**：总培训场次较少，且参训人数不多，可能导致培训资源（如讲师时间、场地等）未能充分利用。

## 2. 课程类型分布分析

- **课程类型占比**：AI培训、管理培训和技术培训各占33.33%，分布较均衡，这种分布符合不同员工的学习需求，但需进一步评估各课程的实际需求和效果。

## 3. 培训规模的趋势

- **培训规模趋势**：月度培训情况显示示，1月份进行了3场培训，参训人数35人，培训时长18小时。由于数据仅限一个月，无法准确判断长期趋势。

## 4. 需要改进的地方

1. **培训效率**：人均培训时长较短，需要提升。
2. **资源利用**：培训场次和参训人数较少，资源利用不充分。
3. **课程评估**：缺乏对课程效果和员工需求的深入评估。

## 5. 具体优化建议

1. **提高培训效率**：
   - 增加每期培训的时长
   - 增加培训场次和参训人数
   
2. **优化资源利用**：
   - 充分利用培训资源
   - 合理安排培训时间和场地
   
3. **课程规划优化**：
   - 定期评估各课程的实际需求和效果
   - 确保课程类型分布符合员工需求

4. **数据跟踪建议**：
   - 持续跟踪月度培训数据
   - 分析长期趋势，及时调整培训策略

通过以上分析和建议，可以有效提升培训效率和资源利用，确保培训内容与员工需求相匹配，从而提升整体培训效果。`
      });
    }

    // 生产环境中调用实际的 API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位专业的培训数据分析师，擅长从培训数据中发现有价值的洞察和建议。请用简洁专业的语言进行分析。',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return NextResponse.json({ content: data.choices[0].message.content });
  } catch (error) {
    console.error('Failed to generate insights:', error);
    return NextResponse.json(
      { error: '生成洞察报告时出错，请稍后重试' },
      { status: 500 }
    );
  }
}
