import * as XLSX from 'xlsx';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { historicalTrainings } from '@/app/lib/schema';
import { validateTrainingData } from '@/app/lib/validators';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file || file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    return NextResponse.json({ error: '仅支持.xlsx格式文件' }, { status: 400 });
  }

  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // 数据验证
    const validationResult = await validateTrainingData(jsonData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: '数据验证失败', details: validationResult.errors },
        { status: 422 }
      );
    }

    // 数据库存储
    await prisma.$transaction([
      prisma.historicalTrainings.createMany({
        data: validationResult.validData,
      }),
    ]);

    return NextResponse.json({ 
      success: true,
      insertedRows: validationResult.validData.length
    });

  } catch (error) {
    console.error('数据处理失败:', error);
    return NextResponse.json(
      { error: '服务器内部错误，请稍后重试' },
      { status: 500 }
    );
  }
}
