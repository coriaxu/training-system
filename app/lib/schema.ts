import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const historicalTrainings = pgTable('historical_trainings', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  date: timestamp('date').notNull(),
  trainer: varchar('trainer', { length: 100 }).notNull(),
  participants: text('participants').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
