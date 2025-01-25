import { v4 as uuidv4 } from 'uuid';
import { Expense, ExpenseFormData } from '@/types/budget';

export type { Expense, ExpenseFormData };

const EXPENSE_STORAGE_KEY = 'training_expenses';

// 保存支出记录
export function saveExpense(data: ExpenseFormData): Expense {
  const expenses = getExpenses();
  const newExpense: Expense = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  expenses.push(newExpense);
  localStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(expenses));
  return newExpense;
}

// 获取所有支出记录
export function getExpenses(): Expense[] {
  if (typeof window === 'undefined') {
    return [];
  }
  const data = localStorage.getItem(EXPENSE_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// 更新支出记录
export function updateExpense(id: string, data: Partial<ExpenseFormData>): Expense | null {
  const expenses = getExpenses();
  const index = expenses.findIndex(e => e.id === id);
  
  if (index === -1) {
    return null;
  }

  const updatedExpense: Expense = {
    ...expenses[index],
    ...data,
    updatedAt: new Date().toISOString()
  };

  expenses[index] = updatedExpense;
  localStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(expenses));
  return updatedExpense;
}

// 删除支出记录
export function deleteExpense(id: string): void {
  const expenses = getExpenses();
  const updatedExpenses = expenses.filter(expense => expense.id !== id);
  localStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(updatedExpenses));
}

// 按月份获取支出记录
export function getExpensesByMonth(month: string): Expense[] {
  const expenses = getExpenses();
  return expenses.filter(expense => expense.date.startsWith(month));
}

// 按预算类型获取支出记录
export function getExpensesByBudgetType(budgetType: string): Expense[] {
  const expenses = getExpenses();
  return expenses.filter(expense => expense.budgetType === budgetType);
}

// 计算总支出
export function calculateTotalExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

// 清除所有支出记录（用于测试或重置）
export function clearExpenses(): void {
  localStorage.removeItem(EXPENSE_STORAGE_KEY);
}