export interface Budget {
  total: number;
  used: number;
  remaining: number;
  warningThreshold: number;
  courseTypeBudgets: {
    type: BudgetType; // 修改为 BudgetType，保持类型一致
    amount: number;
  }[];
}

export type BudgetType = '日常培训开销' | '特殊项目开销' | '差旅费用';

export interface Expense {
  id: string;
  date: string;
  project: string;
  amount: number;
  budgetType: BudgetType; //  精简：只保留 budgetType，如果 type 还有其他用途，请补充说明
  note?: string;
  createdAt: string;
  updatedAt: string;
}


export interface ExpenseFormData {
  date: string;
  project: string;
  amount: number;
  budgetType: BudgetType; // 使用 BudgetType
  note?: string;
}