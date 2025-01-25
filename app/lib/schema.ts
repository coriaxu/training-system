import { sql } from '@vercel/postgres';
import { integer, pgTable, serial, text, timestamp, uuid, decimal } from 'drizzle-orm/pg-core';

// 培训历史记录表
export const historicalTrainings = pgTable('historical_trainings', {
  id: uuid('id').defaultRandom().primaryKey(),
  year: integer('year').notNull(),
  courseName: text('course_name').notNull(),
  participants: integer('participants').notNull(),
  duration: decimal('duration').notNull(),
  department: text('department').notNull(),
  trainingDate: timestamp('training_date').notNull(),
  cost: decimal('cost'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// 数据库查询函数
export async function getTrainingHistory() {
  const { rows } = await sql`
    SELECT * FROM historical_trainings 
    ORDER BY training_date DESC
  `;
  return rows;
}

export async function addTrainingHistory(data: any) {
  const { rows } = await sql`
    INSERT INTO historical_trainings (
      year,
      course_name,
      participants,
      duration,
      department,
      training_date,
      cost
    ) VALUES (
      ${data.year},
      ${data.courseName},
      ${data.participants},
      ${data.duration},
      ${data.department},
      ${data.trainingDate},
      ${data.cost}
    )
    RETURNING *
  `;
  return rows[0];
}
