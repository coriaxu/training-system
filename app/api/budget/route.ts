import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// 获取预算数据
export async function GET() {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const budget = await prisma.budget.findFirst({
      where: {
        month: currentMonth,
      },
      include: {
        courseTypeBudgets: true,
      },
    });

    return NextResponse.json(budget || { month: currentMonth, totalBudget: 0, courseTypeBudgets: [] });
  } catch (error) {
    console.error('获取预算数据失败:', error);
    return NextResponse.json(
      { error: '获取预算数据失败' },
      { status: 500 }
    );
  }
}

// 保存预算数据
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("收到的请求数据:", data);

    // 数据验证
    if (!data.month || !data.totalBudget || !Array.isArray(data.courseTypeBudgets)) {
      console.error("数据格式错误:", data);
      return NextResponse.json({ error: "数据格式错误" }, { status: 400 });
    }

    // 检查每个课程类型预算的数据格式
    const isValidBudgetItem = data.courseTypeBudgets.every(item => 
      typeof item.type === 'string' && 
      typeof item.amount === 'number'
    );

    if (!isValidBudgetItem) {
      console.error("课程类型预算数据格式错误:", data.courseTypeBudgets);
      return NextResponse.json({ error: "课程类型预算数据格式错误" }, { status: 400 });
    }

    const budget = await prisma.$transaction(async (tx) => {
      // 1. 查找是否存在当月预算
      const existingBudget = await tx.budget.findFirst({
        where: { month: data.month },
        include: { courseTypeBudgets: true }
      });

      if (existingBudget) {
        // 2. 如果存在，先删除所有课程类型预算
        await tx.courseTypeBudget.deleteMany({
          where: { budgetId: existingBudget.id }
        });

        // 3. 更新预算和添加新的课程类型预算
        return await tx.budget.update({
          where: { id: existingBudget.id },
          data: {
            totalBudget: data.totalBudget,
            notes: data.notes,
            courseTypeBudgets: {
              create: data.courseTypeBudgets.map(b => ({
                type: b.type,
                amount: b.amount
              }))
            }
          },
          include: { courseTypeBudgets: true }
        });
      } else {
        // 4. 如果不存在，创建新预算
        return await tx.budget.create({
          data: {
            month: data.month,
            totalBudget: data.totalBudget,
            notes: data.notes,
            courseTypeBudgets: {
              create: data.courseTypeBudgets.map(b => ({
                type: b.type,
                amount: b.amount
              }))
            }
          },
          include: { courseTypeBudgets: true }
        });
      }
    });

    console.log("保存成功，返回数据:", budget);
    return NextResponse.json(budget);
  } catch (error) {
    console.error("保存预算数据失败，详细错误:", error);
    return NextResponse.json(
      { error: "保存预算数据失败", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
