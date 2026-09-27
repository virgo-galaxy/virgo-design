import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';

import { rawScssSourcePlugin } from './config/raw-scss-source-plugin.ts';

export default defineConfig({
  plugins: [rawScssSourcePlugin()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./apps/website/src', import.meta.url)),
      '@virgo-design/colors': fileURLToPath(
        new URL('./packages/colors/src/index.ts', import.meta.url),
      ),
      '@virgo-design/icons': fileURLToPath(
        new URL('./packages/icons/src/index.ts', import.meta.url),
      ),
      '@virgo-design/primitives': fileURLToPath(
        new URL('./packages/primitives/src/index.ts', import.meta.url),
      ),
      '@virgo-design/tokens/styles.css': fileURLToPath(
        new URL('./packages/tokens/dist/css/styles.css', import.meta.url),
      ),
      '@virgo-design/tokens': fileURLToPath(
        new URL('./packages/tokens/src/index.ts', import.meta.url),
      ),
      '@virgo-design/ui/metadata': fileURLToPath(
        new URL('./packages/ui/src/metadata/index.ts', import.meta.url),
      ),
      '@virgo-design/ui': fileURLToPath(new URL('./packages/ui/src/index.ts', import.meta.url)),
    },
  },

  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    passWithNoTests: true,
  },
});
