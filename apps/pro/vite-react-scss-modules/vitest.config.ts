import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@virgo-design/tokens': fileURLToPath(
        new URL('../../../packages/tokens/src/index.ts', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'node',
    include: ['src/data/**/*.test.ts', 'src/app/**/*.test.ts', 'src/i18n/**/*.test.{ts,tsx}'],
  },
});
