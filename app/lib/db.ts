import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

// 导出数据库实例
export const db = drizzle(sql);

// 创建预算表
export async function createBudgetTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS budgets (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        month VARCHAR(7) UNIQUE NOT NULL,
        total_budget DECIMAL(10,2) NOT NULL,
        course_type_budgets JSONB NOT NULL,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('预算表创建成功');
  } catch (error) {
    console.error('创建预算表失败:', error);
    throw error;
  }
}

// 创建支出表
export async function createExpenseTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS expenses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        date DATE NOT NULL,
        project VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        budget_type VARCHAR(50) NOT NULL,
        note TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('支出表创建成功');
  } catch (error) {
    console.error('创建支出表失败:', error);
    throw error;
  }
}

// 创建培训记录表
export async function createTrainingTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS historical_trainings (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        year INTEGER NOT NULL,
        course_name VARCHAR(255) NOT NULL,
        participants INTEGER NOT NULL,
        duration DECIMAL(4,1) NOT NULL,
        department VARCHAR(50) NOT NULL,
        training_date TIMESTAMP NOT NULL,
        cost DECIMAL(10,2),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('培训记录表创建成功');
  } catch (error) {
    console.error('创建培训记录表失败:', error);
    throw error;
  }
}

// 初始化所有数据表
export async function initDatabase() {
  await createBudgetTable();
  await createExpenseTable();
  await createTrainingTable();
}
