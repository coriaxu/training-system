import { DeepSeekAPI } from 'deepseek-api';
import { TrainingRecord } from '../../../lib/storage';

// 创建 DeepSeek 客户端
const deepseek = new DeepSeekAPI({
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const data: TrainingRecord[] = JSON.parse(prompt);

  const systemPrompt = `你是一位专业的培训分析师。请根据提供的培训记录数据，生成一份详细的分析报告。
分析应包括以下方面：
1. 培训总体情况（总课时、总参与人次等）
2. 课程类型分布
3. 培训效果评估
4. 趋势分析
5. 改进建议

请使用 Markdown 格式输出报告。`;

  const response = await deepseek.chat.completions.create({
    model: 'deepseek-chat',
    stream: true,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `请分析以下培训记录数据：${JSON.stringify(data, null, 2)}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  // 创建一个 TransformStream 来处理 DeepSeek 的响应
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  
  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      const text = decoder.decode(chunk);
      controller.enqueue(encoder.encode(text));
    },
  });

  return new Response(response.toReadableStream().pipeThrough(transformStream), {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
