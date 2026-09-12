import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@virgo-design/colors': fileURLToPath(
        new URL('./packages/colors/src/index.ts', import.meta.url),
      ),
      '@virgo-design/tokens': fileURLToPath(
        new URL('./packages/tokens/src/index.ts', import.meta.url),
      ),
    },
  },

  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    passWithNoTests: true,
  },
});
