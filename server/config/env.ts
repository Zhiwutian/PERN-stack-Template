import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(8080),
  DATABASE_URL: z.string().optional().default(''),
  TOKEN_SECRET: z.string().min(1, 'TOKEN_SECRET is required'),
});

/** Format zod issues into a single startup error string. */
function formatEnvIssues(issues: z.ZodIssue[]): string {
  return issues
    .map((issue) => `${issue.path.join('.') || 'env'}: ${issue.message}`)
    .join('; ');
}

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  const formatted = formatEnvIssues(parsed.error.issues);
  throw new Error(`Invalid environment configuration: ${formatted}`);
}

/** Validated, typed runtime environment values. */
export const env = parsed.data;
