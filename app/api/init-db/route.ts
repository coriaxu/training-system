import { NextResponse } from 'next/server';
import { initDatabase } from '@/app/lib/db';

export async function GET() {
  try {
    await initDatabase();
    return NextResponse.json({ message: '数据库初始化成功' });
  } catch (error) {
    console.error('数据库初始化失败:', error);
    return NextResponse.json(
      { error: '数据库初始化失败' },
      { status: 500 }
    );
  }
}
