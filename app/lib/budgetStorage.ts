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

interface StorageData {
  version: number;
  data: BudgetData[];
  timestamp: string;
}

const BUDGET_STORAGE_KEY = 'training_budgets_v1';
const BUDGET_BACKUP_KEY = 'training_budgets_backup';

export function saveBudgetData(data: Omit<BudgetData, 'id'>): BudgetData {
  try {
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

    // 添加版本控制和时间戳
    const storageData: StorageData = {
      version: 1,
      data: budgets,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(storageData));
    backupBudgetData(storageData); // 自动备份
    console.log('预算数据保存成功：', newBudget);
    return newBudget;
  } catch (error) {
    console.error('保存预算数据失败：', error);
    throw error;
  }
}

export function getBudgetData(): BudgetData[] {
  try {
    const rawData = localStorage.getItem(BUDGET_STORAGE_KEY);
    if (!rawData) return [];

    const parsedData = JSON.parse(rawData);
    
    // 处理不同版本的数据格式
    if (Array.isArray(parsedData)) {
      // 旧版本数据，自动升级
      const storageData: StorageData = {
        version: 1,
        data: parsedData,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(storageData));
      return parsedData;
    }
    
    return parsedData.data || [];
  } catch (error) {
    console.error('读取预算数据失败：', error);
    const backup = restoreBudgetData(); // 尝试从备份恢复
    return backup || [];
  }
}

export function getBudgetByMonth(month: string): BudgetData | null {
  const budgets = getBudgetData();
  return budgets.find(b => b.month === month) || null;
}

function backupBudgetData(data: StorageData): void {
  try {
    localStorage.setItem(BUDGET_BACKUP_KEY, JSON.stringify(data));
    console.log('备份数据已创建');
  } catch (error) {
    console.error('备份数据失败：', error);
  }
}

function restoreBudgetData(): BudgetData[] | null {
  try {
    const backup = localStorage.getItem(BUDGET_BACKUP_KEY);
    if (!backup) return null;

    const parsedBackup = JSON.parse(backup);
    return parsedBackup.data || null;
  } catch (error) {
    console.error('恢复备份数据失败：', error);
    return null;
  }
}