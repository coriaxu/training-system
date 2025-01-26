// 预算类型定义
export interface Budget {
  total: number;          // 总预算
  used: number;          // 已使用金额
  remaining: number;     // 剩余金额
  warningThreshold: number;  // 预警阈值（百分比）
  courseTypeBudgets: CourseTypeBudget[];  // 各类课程预算
}

// 课程类型预算
export interface CourseTypeBudget {
  type: string;   // 课程类型
  amount: number; // 预算金额
}

// 支出记录
export interface Expense {
  id: string;
  date: string;
  amount: number;
  courseType: string;
  description: string;
  createdAt: string;
}

// 支出表单数据
export interface ExpenseFormData {
  date: string;
  amount: number;
  courseType: string;
  description: string;
}

// 预算数据库记录
export interface BudgetData extends Budget {
  month: string;  // 预算月份 YYYY-MM
  notes?: string; // 备注信息
}
