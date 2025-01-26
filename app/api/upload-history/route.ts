import { NextResponse } from 'next/server';
import { read, utils } from 'xlsx';
import { db } from '@/app/lib/db';
import { historicalTrainings } from '@/app/lib/schema';
import { validateTrainingData } from '@/app/lib/validators';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: '请选择要上传的文件' }, { status: 400 });
  }

  try {
    const buffer = await file.arrayBuffer();
    const workbook = read(new Uint8Array(buffer), { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(sheet);

    // 数据验证
    const validationResult = await validateTrainingData(jsonData);
    
    if (!validationResult.success) {
      return NextResponse.json({ 
        error: '数据验证失败', 
        details: validationResult.errors 
      }, { status: 400 });
    }

    // 保存到数据库
    const values = validationResult.validData.map(record => ({
      year: record.year,
      courseName: record.courseName,
      participants: record.participants,
      duration: record.duration,
      department: record.department,
      trainingDate: new Date(record.trainingDate),
      cost: record.cost || 0
    }));

    await db.insert(historicalTrainings).values(values);

    return NextResponse.json({ 
      message: '培训历史记录上传成功',
      count: values.length 
    });

  } catch (error) {
    console.error('处理培训历史记录失败:', error);
    return NextResponse.json({ error: '处理文件时出错' }, { status: 500 });
  }
}
