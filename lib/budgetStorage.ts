import { Budget, BudgetFormData } from '@/types/budget';
import { v4 as uuidv4 } from 'uuid';

const BUDGET_STORAGE_KEY = 'training_budgets_v1';

// 获取所有预算数据
export function getBudgetData(): Budget[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(BUDGET_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('读取预算数据失败:', error);
    return [];
  }
}

// 获取指定月份的预算
export function getBudgetByMonth(month: string): Budget | null {
  const budgets = getBudgetData();
  return budgets.find(b => b.month === month) || null;
}

// 保存预算数据
export function saveBudgetData(data: BudgetFormData): Budget {
  try {
    const budgets = getBudgetData();
    const existingIndex = budgets.findIndex(b => b.month === data.month);
    
    const newBudget: Budget = {
      id: existingIndex >= 0 ? budgets[existingIndex].id : uuidv4(),
      ...data,
      createdAt: existingIndex >= 0 ? budgets[existingIndex].createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      budgets[existingIndex] = newBudget;
    } else {
      budgets.push(newBudget);
    }

    localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budgets));
    return newBudget;
  } catch (error) {
    console.error('保存预算数据失败:', error);
    throw new Error('保存预算数据失败');
  }
} 