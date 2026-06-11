import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    passWithNoTests: true,
    setupFiles: ['test/setup.ts'],
    include: ['test/**/*.{spec,test}.ts', 'app/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['app/**/*.ts'],
      exclude: ['**/*.spec.ts', '**/*.d.ts', 'app/main.ts'],
    },
  },
});
