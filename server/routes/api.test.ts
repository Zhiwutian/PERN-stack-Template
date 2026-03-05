import request from 'supertest';
import { Express } from 'express';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

describe('api routes', () => {
  let app: Express;
  const originalDatabaseUrl = process.env.DATABASE_URL;
  const originalTokenSecret = process.env.TOKEN_SECRET;

  beforeAll(async () => {
    process.env.TOKEN_SECRET = process.env.TOKEN_SECRET ?? 'test-token-secret';
    const { createApp } = await import('../app.js');
    app = createApp();
  });

  afterEach(() => {
    process.env.DATABASE_URL = originalDatabaseUrl;
  });

  afterAll(() => {
    process.env.TOKEN_SECRET = originalTokenSecret;
  });

  it('returns hello message from /api/hello', async () => {
    const res = await request(app).get('/api/hello').expect(200);
    expect(res.body).toEqual({ message: 'Hello, World!' });
  });

  it('returns not_configured from /api/health when DATABASE_URL is missing', async () => {
    delete process.env.DATABASE_URL;

    const res = await request(app).get('/api/health').expect(200);
    expect(res.body.api).toBe('ok');
    expect(res.body.database).toBe('not_configured');
    expect(typeof res.body.checkedAt).toBe('string');
  });
});
