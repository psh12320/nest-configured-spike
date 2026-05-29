import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    passWithNoTests: true,
    setupFiles: ['test/setup.ts'],
    include: ['test/**/*.e2e-spec.ts'],
  },
});
