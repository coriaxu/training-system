import { sql } from '@vercel/postgres';

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

// 保存预算数据
export async function saveBudgetData(data: Omit<BudgetData, 'id'>): Promise<BudgetData> {
  try {
    // 检查是否已存在同月份的预算
    const existingBudget = await sql`
      SELECT * FROM budgets WHERE month = ${data.month}
    `;

    if (existingBudget.rows.length > 0) {
      // 更新现有预算
      const updated = await sql`
        UPDATE budgets
        SET 
          total_budget = ${data.totalBudget},
          course_type_budgets = ${JSON.stringify(data.courseTypeBudgets)},
          notes = ${data.notes},
          updated_at = CURRENT_TIMESTAMP
        WHERE month = ${data.month}
        RETURNING *
      `;
      return {
        id: updated.rows[0].id,
        month: updated.rows[0].month,
        totalBudget: parseFloat(updated.rows[0].total_budget),
        courseTypeBudgets: updated.rows[0].course_type_budgets,
        notes: updated.rows[0].notes
      };
    } else {
      // 创建新预算
      const inserted = await sql`
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
      return {
        id: inserted.rows[0].id,
        month: inserted.rows[0].month,
        totalBudget: parseFloat(inserted.rows[0].total_budget),
        courseTypeBudgets: inserted.rows[0].course_type_budgets,
        notes: inserted.rows[0].notes
      };
    }
  } catch (error) {
    console.error('保存预算数据失败:', error);
    throw error;
  }
}

// 获取所有预算数据
export async function getBudgetData(): Promise<BudgetData[]> {
  try {
    const result = await sql`SELECT * FROM budgets ORDER BY month DESC`;
    return result.rows.map(row => ({
      id: row.id,
      month: row.month,
      totalBudget: parseFloat(row.total_budget),
      courseTypeBudgets: row.course_type_budgets,
      notes: row.notes
    }));
  } catch (error) {
    console.error('获取预算数据失败:', error);
    throw error;
  }
}

// 根据月份获取预算
export async function getBudgetByMonth(month: string): Promise<BudgetData | null> {
  try {
    const result = await sql`SELECT * FROM budgets WHERE month = ${month}`;
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return {
      id: row.id,
      month: row.month,
      totalBudget: parseFloat(row.total_budget),
      courseTypeBudgets: row.course_type_budgets,
      notes: row.notes
    };
  } catch (error) {
    console.error('获取月度预算失败:', error);
    throw error;
  }
}