import { defineConfig } from 'vitest/config';

import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@/features': path.resolve(__dirname, './packages/features'),
    },
  },
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    include: ['packages/**/*.test.ts'],
    setupFiles: ['./packages/features/test/setup.ts'],
  },
});
