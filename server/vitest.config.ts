import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    setupFiles: ['./test/setup.ts'],
    globals: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      exclude: ['**/*.test.ts'],
      thresholds: {
        lines: 40,
        functions: 40,
        branches: 20,
        statements: 40,
      },
    },
  },
});
