import pino from 'pino';
import pinoHttp from 'pino-http';
import { randomUUID } from 'node:crypto';
import { env } from '../config/env.js';

export const logger = pino({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
});

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req, res) => {
    const existingId = req.headers['x-request-id'];
    const reqId =
      typeof existingId === 'string' && existingId.length > 0
        ? existingId
        : randomUUID();
    res.setHeader('x-request-id', reqId);
    return reqId;
  },
});
