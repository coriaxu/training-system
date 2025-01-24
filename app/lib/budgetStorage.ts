import { v4 as uuidv4 } from 'uuid';

export interface BudgetData {
  id: string;
  month: string;
  totalBudget: number;
  courseTypeBudgets: {
    type: string;
    amount: number;
  }[];
  notes?: string;
}

const BUDGET_STORAGE_KEY = 'training_budgets';

export function saveBudgetData(data: Omit<BudgetData, 'id'>): BudgetData {
  const budgets = getBudgetData();
  const newBudget: BudgetData = {
    ...data,
    id: uuidv4(),
  };

  // 检查是否已存在同月份的预算
  const existingIndex = budgets.findIndex(b => b.month === data.month);
  if (existingIndex >= 0) {
    budgets[existingIndex] = newBudget;
  } else {
    budgets.push(newBudget);
  }

  localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budgets));
  return newBudget;
}

export function getBudgetData(): BudgetData[] {
  if (typeof window === 'undefined') {
    return [];
  }
  const data = localStorage.getItem(BUDGET_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getBudgetByMonth(month: string): BudgetData | null {
  const budgets = getBudgetData();
  return budgets.find(b => b.month === month) || null;
}