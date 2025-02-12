// 课程类型
export const COURSE_TYPES = ['技术培训', '管理培训', '新员工培训'] as const;

export interface TrainingRecord {
  id: string;
  courseType: string;
  courseName: string;
  startDate: string;
  duration: number;
  participants: number;
  satisfaction: number;
}

interface KPIs {
  totalSessions: number;
  totalParticipants: number;
  totalDuration: number;
  totalManHours: number;
  sessionsTrend: number;
  participantsTrend: number;
  durationTrend: number;
  manHoursTrend: number;
}

// 测试数据
const TEST_DATA: TrainingRecord[] = [
  {
    id: '1',
    courseType: 'AI培训',
    courseName: '深度学习基础',
    startDate: '2025-01-10',
    duration: 6,
    participants: 12,
    satisfaction: 0,
  },
  {
    id: '2',
    courseType: '管理培训',
    courseName: '团队领导力',
    startDate: '2025-01-15',
    duration: 4,
    participants: 8,
    satisfaction: 0,
  },
  {
    id: '3',
    courseType: '技术培训',
    courseName: 'Web开发实践',
    startDate: '2025-01-20',
    duration: 8,
    participants: 15,
    satisfaction: 0,
  },
];

const STORAGE_KEY = 'training_records';

// 生成唯一ID
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// 保存培训记录
export function saveTrainingRecord(
  data: Omit<TrainingRecord, 'id'>
): TrainingRecord {
  const records = getTrainingRecords();
  const newRecord = {
    ...data,
    id: generateId(),
  };
  records.push(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return newRecord;
}

// 获取所有培训记录
export function getTrainingRecords(): TrainingRecord[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) {
    // 如果没有数据，使用测试数据
    localStorage.setItem(STORAGE_KEY, JSON.stringify(TEST_DATA));
    return TEST_DATA;
  }
  
  return JSON.parse(storedData);
}

// 删除培训记录
export function deleteTrainingRecord(id: string): void {
  const records = getTrainingRecords();
  const updatedRecords = records.filter((record) => record.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
}

// 计算培训相关的 KPI 指标
export function calculateKPIs(records: TrainingRecord[]): KPIs {
  // 计算所有记录的汇总数据
  const totalSessions = records.length;
  const totalParticipants = records.reduce((sum, r) => sum + (r.participants || 0), 0);
  const totalDuration = records.reduce((sum, r) => sum + (r.duration || 0), 0);
  const totalManHours = records.reduce((sum, r) => sum + ((r.duration || 0) * (r.participants || 0)), 0);

  // 按月份分组计算趋势
  const byMonth = records.reduce((acc, record) => {
    if (!record.startDate) return acc;
    const month = record.startDate.split('-').slice(0, 2).join('-');
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(record);
    return acc;
  }, {} as Record<string, TrainingRecord[]>);

  // 获取当前月份
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

  // 获取上个月
  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastMonthKey = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;

  // 计算当月数据
  const currentRecords = byMonth[currentMonth] || [];
  const currentSessions = currentRecords.length;
  const currentParticipants = currentRecords.reduce((sum, r) => sum + (r.participants || 0), 0);
  const currentDuration = currentRecords.reduce((sum, r) => sum + (r.duration || 0), 0);
  const currentManHours = currentRecords.reduce((sum, r) => sum + ((r.duration || 0) * (r.participants || 0)), 0);

  // 计算上月数据
  const lastRecords = byMonth[lastMonthKey] || [];
  const lastSessions = lastRecords.length;
  const lastParticipants = lastRecords.reduce((sum, r) => sum + (r.participants || 0), 0);
  const lastDuration = lastRecords.reduce((sum, r) => sum + (r.duration || 0), 0);
  const lastManHours = lastRecords.reduce((sum, r) => sum + ((r.duration || 0) * (r.participants || 0)), 0);

  // 计算环比增长率
  const calculateTrend = (current: number, last: number) => {
    if (last === 0) return current > 0 ? 100 : 0;
    return ((current - last) / last) * 100;
  };

  return {
    totalSessions,
    totalParticipants,
    totalDuration,
    totalManHours,
    sessionsTrend: Math.round(calculateTrend(currentSessions, lastSessions) * 10) / 10,
    participantsTrend: Math.round(calculateTrend(currentParticipants, lastParticipants) * 10) / 10,
    durationTrend: Math.round(calculateTrend(currentDuration, lastDuration) * 10) / 10,
    manHoursTrend: Math.round(calculateTrend(currentManHours, lastManHours) * 10) / 10,
  };
}

// 按日期对记录进行分组
export function groupRecordsByDate(records: TrainingRecord[]) {
  return records.reduce((groups, record) => {
    const date = record.startDate.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(record);
    return groups;
  }, {} as Record<string, TrainingRecord[]>);
}

// 按课程类型对记录进行分组
export function groupRecordsByType(records: TrainingRecord[]) {
  return records.reduce((groups, record) => {
    if (!groups[record.courseType]) {
      groups[record.courseType] = [];
    }
    groups[record.courseType].push(record);
    return groups;
  }, {} as Record<string, TrainingRecord[]>);
}

export function clearTrainingRecords() {
  localStorage.removeItem(STORAGE_KEY);
}
