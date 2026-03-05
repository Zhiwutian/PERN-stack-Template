import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getDbPool } from '../db/pool.js';
import { logger } from '../lib/logger.js';
import { readHealthReport } from './health-service.js';

vi.mock('../db/pool.js', () => ({
  getDbPool: vi.fn(),
}));

describe('readHealthReport', () => {
  const getDbPoolMock = vi.mocked(getDbPool);

  beforeEach(() => {
    getDbPoolMock.mockReset();
    vi.restoreAllMocks();
  });

  it('returns not_configured when database pool is unavailable', async () => {
    getDbPoolMock.mockReturnValue(null);

    const report = await readHealthReport();

    expect(report.api).toBe('ok');
    expect(report.database).toBe('not_configured');
    expect(typeof report.checkedAt).toBe('string');
  });

  it('returns ok when the database query succeeds', async () => {
    const query = vi.fn(async () => ({ rows: [{ ok: 1 }] }));
    getDbPoolMock.mockReturnValue({ query } as never);

    const report = await readHealthReport();

    expect(query).toHaveBeenCalledWith('select 1 as ok');
    expect(report.database).toBe('ok');
  });

  it('returns unavailable when the database query fails', async () => {
    const query = vi.fn(async () => {
      throw new Error('db down');
    });
    getDbPoolMock.mockReturnValue({ query } as never);
    const loggerWarnSpy = vi
      .spyOn(logger, 'warn')
      .mockImplementation(() => logger);

    const report = await readHealthReport();

    expect(report.database).toBe('unavailable');
    expect(loggerWarnSpy).toHaveBeenCalled();
  });
});
