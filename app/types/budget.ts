export interface CourseTypeBudget {
  id: string;
  type: string;
  amount: number;
  budgetId: string;
}

export interface Budget {
  id: string;
  month: string;
  totalBudget: number;
  notes?: string;
  courseTypeBudgets: CourseTypeBudget[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  month: string;
  type: string;
  amount: number;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetFormData {
  id: string;
  month: string;
  totalBudget: number;
  notes?: string;
  courseTypeBudgets: Array<{
    type: string;
    amount: number;
  }>;
}

export interface ExpenseFormData {
  type: string;
  amount: number;
  description: string;
  date: Date;
}
