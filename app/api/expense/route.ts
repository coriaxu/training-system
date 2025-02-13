import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// 获取支出数据
export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
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

    // 验证必填字段
    if (!data.type || !data.amount || !data.date) {
      console.error('缺少必填字段:', { type: data.type, amount: data.amount, date: data.date });
      return NextResponse.json(
        { error: '请填写所有必填字段（课程类型、金额、日期）' },
        { status: 400 }
      );
    }

    // 验证金额
    const amount = Number(data.amount);
    if (isNaN(amount) || amount <= 0) {
      console.error('金额无效:', amount);
      return NextResponse.json(
        { error: '请输入有效的金额' },
        { status: 400 }
      );
    }

    // 验证日期
    const date = new Date(data.date);
    if (isNaN(date.getTime())) {
      console.error('日期无效:', data.date);
      return NextResponse.json(
        { error: '请输入有效的日期' },
        { status: 400 }
      );
    }

    // 创建支出记录
    const expense = await prisma.expense.create({
      data: {
        type: data.type,
        amount: amount,
        date: date,
        description: data.description || '',
      },
    });

    console.log("保存支出成功:", expense);
    return NextResponse.json(expense, { status: 201 });

  } catch (error) {
    console.error("保存支出数据失败:", error);
    return NextResponse.json(
      { error: "保存支出数据失败，请重试" },
      { status: 500 }
    );
  }
}
