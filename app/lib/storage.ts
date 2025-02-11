// 课程类型
export const COURSE_TYPES = [
  '技术培训',
  '管理培训',
  '通用技能',
  '新员工培训',
  '合规培训',
] as const;

export interface TrainingRecord {
  id: string;
  courseType: string;
  courseName: string;
  instructor: string;
  date: string;
  participants: number;
  duration: number;
}

interface KPIs {
  totalSessions: number;
  totalParticipants: number;
  totalDuration: number;
  averageParticipants: number;
  totalParticipantHours: number;
}

// 测试数据
const TEST_DATA: TrainingRecord[] = [
  {
    id: '1',
    courseType: 'AI培训',
    courseName: '深度学习基础',
    instructor: '张教授',
    date: '2025-01-10',
    participants: 12,
    duration: 6,
  },
  {
    id: '2',
    courseType: '管理培训',
    courseName: '团队领导力',
    instructor: '李老师',
    date: '2025-01-15',
    participants: 8,
    duration: 4,
  },
  {
    id: '3',
    courseType: '技术培训',
    courseName: 'Web开发实践',
    instructor: '王工程师',
    date: '2025-01-20',
    participants: 15,
    duration: 8,
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

// 计算关键绩效指标
export function calculateKPIs(records: TrainingRecord[]): KPIs {
  const totalSessions = records.length;
  const totalParticipants = records.reduce(
    (sum, record) => sum + record.participants,
    0
  );
  const totalDuration = records.reduce(
    (sum, record) => sum + record.duration,
    0
  );
  const averageParticipants =
    totalSessions > 0 ? totalParticipants / totalSessions : 0;
  const totalParticipantHours = records.reduce(
    (sum, record) => sum + record.participants * record.duration,
    0
  );

  return {
    totalSessions,
    totalParticipants,
    totalDuration,
    averageParticipants,
    totalParticipantHours,
  };
}

// 按日期对记录进行分组
export function groupRecordsByDate(records: TrainingRecord[]) {
  return records.reduce((groups, record) => {
    const date = record.date.split('T')[0];
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
