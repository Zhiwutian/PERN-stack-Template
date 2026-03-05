import pg from 'pg';
import { env } from '../config/env.js';

let pool: pg.Pool | undefined;

export function getDbPool(): pg.Pool | null {
  const connectionString = env.DATABASE_URL;
  if (!connectionString) return null;

  if (!pool) {
    pool = new pg.Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  return pool;
}
