import { Request, Response } from 'express';

export function readHello(_req: Request, res: Response): void {
  res.json({ message: 'Hello, World!' });
}
