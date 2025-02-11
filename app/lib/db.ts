import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// 使用环境变量或默认配置
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'training_db',
});

export const db = drizzle(pool);
