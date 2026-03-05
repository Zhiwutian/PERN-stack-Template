import { NextFunction, Request, Response } from 'express';
import { readHealthReport } from '../services/health-service.js';

/** Handle `GET /api/health`. */
export async function readHealth(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const report = await readHealthReport();
    const statusCode = report.database === 'unavailable' ? 503 : 200;
    res.status(statusCode).json(report);
  } catch (err) {
    next(err);
  }
}
