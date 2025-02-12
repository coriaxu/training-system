import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// 获取支出数据
export async function GET() {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const expenses = await prisma.expense.findMany({
      where: {
        month: currentMonth,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.error('获取支出数据失败:', error);
    return NextResponse.json(
      { error: '获取支出数据失败' },
      { status: 500 }
    );
  }
}

// 保存支出数据
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("收到的支出数据:", data);

    // 数据验证
    if (!data.month || !data.type || !data.amount || !data.description || !data.date) {
      console.error("支出数据格式错误:", data);
      return NextResponse.json({ error: "数据格式错误" }, { status: 400 });
    }

    const expense = await prisma.expense.create({
      data: {
        month: data.month,
        type: data.type,
        amount: data.amount,
        description: data.description,
        date: new Date(data.date),
      },
    });

    console.log("保存支出成功:", expense);
    return NextResponse.json(expense);
  } catch (error) {
    console.error("保存支出数据失败:", error);
    return NextResponse.json(
      { error: "保存支出数据失败", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
