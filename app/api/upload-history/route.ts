import * as XLSX from 'xlsx';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db';
import { validateTrainingData } from '@/app/lib/validators';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ 
        success: false, 
        error: '未找到上传的文件' 
      }, { status: 400 });
    }

    // 读取Excel文件
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // 验证数据
    const validationResult = validateTrainingData(jsonData);
    if (validationResult.errors.length > 0) {
      return NextResponse.json({ 
        success: false, 
        errors: validationResult.errors 
      }, { status: 400 });
    }

    // 数据库存储
    await prisma.$transaction([
      prisma.training.createMany({
        data: validationResult.validData,
      }),
    ]);

    return NextResponse.json({ 
      success: true, 
      message: '历史培训记录导入成功',
      data: validationResult.validData
    });

  } catch (error) {
    console.error('导入历史培训记录失败:', error);
    return NextResponse.json({ 
      success: false, 
      error: '导入失败，请检查文件格式是否正确'
    }, { status: 500 });
  }
}
