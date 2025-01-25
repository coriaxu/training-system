import { sql } from '@vercel/postgres';
import { Budget } from '@/types/budget';

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

// 将数据库格式转换为前端格式
function convertToBudget(data: BudgetData): Budget {
  return {
    total: data.totalBudget,
    used: 0, // 这个值需要根据实际支出计算
    remaining: data.totalBudget,
    warningThreshold: 80,
    courseTypeBudgets: data.courseTypeBudgets
  };
}

// 保存预算数据
export async function saveBudgetData(data: Omit<BudgetData, 'id'>): Promise<Budget> {
  try {
    // 检查是否已存在同月份的预算
    const existingBudget = await sql`
      SELECT * FROM budgets WHERE month = ${data.month}
    `;

    let result;
    if (existingBudget.rows.length > 0) {
      // 更新现有预算
      result = await sql`
        UPDATE budgets
        SET 
          total_budget = ${data.totalBudget},
          course_type_budgets = ${JSON.stringify(data.courseTypeBudgets)},
          notes = ${data.notes},
          updated_at = CURRENT_TIMESTAMP
        WHERE month = ${data.month}
        RETURNING *
      `;
    } else {
      // 创建新预算
      result = await sql`
        INSERT INTO budgets (
          month, 
          total_budget, 
          course_type_budgets,
          notes
        ) VALUES (
          ${data.month},
          ${data.totalBudget},
          ${JSON.stringify(data.courseTypeBudgets)},
          ${data.notes}
        )
        RETURNING *
      `;
    }

    const savedData = result.rows[0];
    return convertToBudget({
      id: savedData.id,
      month: savedData.month,
      totalBudget: savedData.total_budget,
      courseTypeBudgets: savedData.course_type_budgets,
      notes: savedData.notes
    });
  } catch (error) {
    console.error('Error saving budget data:', error);
    throw error;
  }
}

// 获取所有预算数据
export async function getBudgetData(): Promise<Budget[]> {
  try {
    const result = await sql`SELECT * FROM budgets ORDER BY month DESC`;
    return result.rows.map(row => convertToBudget({
      id: row.id,
      month: row.month,
      totalBudget: row.total_budget,
      courseTypeBudgets: row.course_type_budgets,
      notes: row.notes
    }));
  } catch (error) {
    console.error('Error getting budget data:', error);
    throw error;
  }
}

// 根据月份获取预算
export async function getBudgetByMonth(month: string): Promise<Budget | null> {
  try {
    const result = await sql`
      SELECT * FROM budgets WHERE month = ${month}
    `;

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return convertToBudget({
      id: row.id,
      month: row.month,
      totalBudget: row.total_budget,
      courseTypeBudgets: row.course_type_budgets,
      notes: row.notes
    });
  } catch (error) {
    console.error('Error getting budget by month:', error);
    throw error;
  }
}