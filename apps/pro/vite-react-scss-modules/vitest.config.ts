import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  resolve: {
    alias: {
      '@virgo-design/charts/echarts': fileURLToPath(
        new URL('../../../packages/charts/src/echarts.tsx', import.meta.url),
      ),
      '@virgo-design/charts/sparkline': fileURLToPath(
        new URL('../../../packages/charts/src/native/Sparkline.tsx', import.meta.url),
      ),
      '@virgo-design/charts': fileURLToPath(
        new URL('../../../packages/charts/src/index.ts', import.meta.url),
      ),
      '@virgo-design/ui/locale': fileURLToPath(
        new URL('../../../packages/ui/src/locale/index.ts', import.meta.url),
      ),
      '@virgo-design/ui': fileURLToPath(
        new URL('../../../packages/ui/src/index.ts', import.meta.url),
      ),
      '@virgo-design/primitives': fileURLToPath(
        new URL('../../../packages/primitives/src/index.ts', import.meta.url),
      ),
      '@virgo-design/icons/brands/virgo-design.svg': fileURLToPath(
        new URL('../../../packages/icons/brands/virgo-design.svg', import.meta.url),
      ),
      '@virgo-design/icons/artwork/grok-bot.svg': fileURLToPath(
        new URL('../../../packages/icons/artwork/grok-bot.svg', import.meta.url),
      ),
      '@virgo-design/icons/artwork': fileURLToPath(
        new URL('../../../packages/icons/src/artwork.ts', import.meta.url),
      ),
      '@virgo-design/icons/registry': fileURLToPath(
        new URL('../../../packages/icons/src/registry.ts', import.meta.url),
      ),
      '@virgo-design/icons': fileURLToPath(
        new URL('../../../packages/icons/src/index.ts', import.meta.url),
      ),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@virgo-design/themes/styles.css': fileURLToPath(
        new URL('../../../packages/themes/src/styles.scss', import.meta.url),
      ),
      '@virgo-design/themes': fileURLToPath(
        new URL('../../../packages/themes/src/index.ts', import.meta.url),
      ),
      '@virgo-design/tokens/styles.css': fileURLToPath(
        new URL('../../../packages/tokens/dist/css/styles.css', import.meta.url),
      ),
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
