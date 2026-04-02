import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['src/lib/tests/setup.ts'],
      include: ['src/lib/tests/**/*.test.ts'],
      typecheck: {
        tsconfig: 'tsconfig.test.json',
      },
    },
  })
);
