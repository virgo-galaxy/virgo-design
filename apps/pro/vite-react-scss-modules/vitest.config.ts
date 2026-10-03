import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  resolve: {
    alias: {
      '@virgo-design/ui': fileURLToPath(
        new URL('../../../packages/ui/src/index.ts', import.meta.url),
      ),
      '@virgo-design/primitives': fileURLToPath(
        new URL('../../../packages/primitives/src/index.ts', import.meta.url),
      ),
      '@virgo-design/icons': fileURLToPath(
        new URL('../../../packages/icons/src/index.ts', import.meta.url),
      ),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@virgo-design/tokens': fileURLToPath(
        new URL('../../../packages/tokens/src/index.ts', import.meta.url),
      ),
    },
  },
  test: {
    name: 'pro',
    environment: 'node',
    setupFiles: [fileURLToPath(new URL('./src/test/setup.ts', import.meta.url))],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
