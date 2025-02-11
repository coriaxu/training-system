// 预算类型
export interface Budget {
  id: string;
  month: string;
  totalBudget: number;
  courseTypeBudgets: CourseTypeBudget[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// 课程类型预算
export interface CourseTypeBudget {
  type: '日常培训' | '专项培训' | '特殊项目';
  amount: number;
}

// 支出记录
export interface Expense {
  id: string;
  date: string;
  project: string;
  amount: number;
  type: '日常培训' | '专项培训' | '特殊项目';
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// 表单数据类型
export interface BudgetFormData {
  month: string;
  totalBudget: number;
  courseTypeBudgets: CourseTypeBudget[];
  notes?: string;
} 