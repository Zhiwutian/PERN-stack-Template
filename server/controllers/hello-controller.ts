import { Request, Response } from 'express';

/** Handle `GET /api/hello`. */
export function readHello(_req: Request, res: Response): void {
  res.json({ message: 'Hello, World!' });
}
