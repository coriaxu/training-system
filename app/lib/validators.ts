import { z } from 'zod';

// 基础培训数据验证模式
const baseTrainingSchema = z.object({
  year: z.number().min(2000).max(2100),
  courseName: z.string().min(2).max(100),
  participants: z.number().int().min(1).max(1000),
  duration: z.number().min(0.5).max(30),
  department: z.enum(['技术部', '市场部', '人力资源', '财务部']),
  trainingDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: '无效的日期格式，请使用YYYY-MM-DD格式'
  }),
  cost: z.number().min(0).max(1000000).optional()
});

export const validateTrainingData = async (data: any[]) => {
  const results = {
    validData: [] as any[],
    errors: [] as { row: number; message: string }[],
    success: false
  };

  for (const [index, item] of data.entries()) {
    try {
      // 转换数字字段
      const parsedItem = {
        ...item,
        year: Number(item.year),
        participants: Number(item.participants),
        duration: Number(item.duration),
        cost: item.cost ? Number(item.cost) : undefined
      };

      // 执行验证
      const validated = baseTrainingSchema.parse(parsedItem);
      results.validData.push({
        ...validated,
        trainingDate: new Date(validated.trainingDate)
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        results.errors.push({
          row: index + 2, // 包含标题行偏移
          message: error.issues.map(issue => issue.message).join('; ')
        });
      }
    }
  }

  results.success = results.errors.length === 0;
  return results;
};
