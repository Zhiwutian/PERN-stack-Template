import { getDbPool } from '../db/pool.js';

export type HealthReport = {
  api: 'ok';
  database: 'ok' | 'unavailable' | 'not_configured';
  checkedAt: string;
};

export async function readHealthReport(): Promise<HealthReport> {
  const checkedAt = new Date().toISOString();
  const pool = getDbPool();

  if (!pool) {
    return {
      api: 'ok',
      database: 'not_configured',
      checkedAt,
    };
  }

  try {
    await pool.query('select 1 as ok');
    return {
      api: 'ok',
      database: 'ok',
      checkedAt,
    };
  } catch (err) {
    console.error('Database health check failed', err);
    return {
      api: 'ok',
      database: 'unavailable',
      checkedAt,
    };
  }
}
