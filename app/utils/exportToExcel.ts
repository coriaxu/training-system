import * as XLSX from 'xlsx';
import { TrainingRecord } from '../lib/storage';

export function exportToExcel(records: TrainingRecord[]) {
  // 准备数据
  const data = records.map((record) => ({
    '课程类型': record.courseType,
    '课程名称': record.courseName,
    '讲师': record.instructor,
    '授课日期': record.date.split('T')[0],
    '参加人数': record.participants,
    '培训时长（小时）': record.duration,
    '培训人时': record.participants * record.duration,
  }));

  // 创建工作簿
  const wb = XLSX.utils.book_new();
  
  // 创建工作表
  const ws = XLSX.utils.json_to_sheet(data);

  // 设置列宽
  const colWidths = [
    { wch: 15 }, // 课程类型
    { wch: 30 }, // 课程名称
    { wch: 15 }, // 讲师
    { wch: 12 }, // 授课日期
    { wch: 10 }, // 参加人数
    { wch: 15 }, // 培训时长
    { wch: 10 }, // 培训人时
  ];
  ws['!cols'] = colWidths;

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(wb, ws, '培训记录');

  // 导出文件
  const fileName = `培训记录_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '')}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
