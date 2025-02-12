import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// 删除支出记录
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.expense.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除支出记录失败:', error);
    return NextResponse.json(
      { error: '删除支出记录失败' },
      { status: 500 }
    );
  }
}

// 更新支出记录
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json();

    const expense = await prisma.expense.update({
      where: { id },
      data: {
        type: data.type,
        amount: data.amount,
        description: data.description,
        date: data.date,
      },
    });

    return NextResponse.json(expense);
  } catch (error) {
    console.error('更新支出记录失败:', error);
    return NextResponse.json(
      { error: '更新支出记录失败' },
      { status: 500 }
    );
  }
}
