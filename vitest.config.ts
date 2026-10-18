import { fileURLToPath, URL } from 'node:url';

import { defaultExclude, defineConfig } from 'vitest/config';

import { rawScssSourcePlugin } from './config/raw-scss-source-plugin.ts';

export default defineConfig({
  plugins: [rawScssSourcePlugin()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./apps/website/src', import.meta.url)),
      '@virgo-design/charts/echarts': fileURLToPath(
        new URL('./packages/charts/src/echarts.tsx', import.meta.url),
      ),
      '@virgo-design/charts/sparkline': fileURLToPath(
        new URL('./packages/charts/src/native/Sparkline.tsx', import.meta.url),
      ),
      '@virgo-design/charts': fileURLToPath(
        new URL('./packages/charts/src/index.ts', import.meta.url),
      ),
      '@virgo-design/colors': fileURLToPath(
        new URL('./packages/colors/src/index.ts', import.meta.url),
      ),
      '@virgo-design/icons/brands/virgo-design.svg': fileURLToPath(
        new URL('./packages/icons/brands/virgo-design.svg', import.meta.url),
      ),
      '@virgo-design/icons/brands': fileURLToPath(
        new URL('./packages/icons/src/brands.ts', import.meta.url),
      ),
      '@virgo-design/icons/metadata': fileURLToPath(
        new URL('./packages/icons/src/metadata.ts', import.meta.url),
      ),
      '@virgo-design/icons/registry': fileURLToPath(
        new URL('./packages/icons/src/registry.ts', import.meta.url),
      ),
      '@virgo-design/icons/assets': fileURLToPath(
        new URL('./packages/icons/src/assets.ts', import.meta.url),
      ),
      '@virgo-design/icons/tooling': fileURLToPath(
        new URL('./packages/icons/src/tooling.ts', import.meta.url),
      ),
      '@virgo-design/icons/artwork/grok-bot.svg': fileURLToPath(
        new URL('./packages/icons/artwork/grok-bot.svg', import.meta.url),
      ),
      '@virgo-design/icons/artwork': fileURLToPath(
        new URL('./packages/icons/src/artwork.ts', import.meta.url),
      ),
      '@virgo-design/icons': fileURLToPath(
        new URL('./packages/icons/src/index.ts', import.meta.url),
      ),
      '@virgo-design/primitives': fileURLToPath(
        new URL('./packages/primitives/src/index.ts', import.meta.url),
      ),
      '@virgo-design/themes/styles.css': fileURLToPath(
        new URL('./packages/themes/src/styles.scss', import.meta.url),
      ),
      '@virgo-design/themes': fileURLToPath(
        new URL('./packages/themes/src/index.ts', import.meta.url),
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
      '@virgo-design/ui/locale': fileURLToPath(
        new URL('./packages/ui/src/locale/index.ts', import.meta.url),
      ),
      '@virgo-design/ui': fileURLToPath(new URL('./packages/ui/src/index.ts', import.meta.url)),
    },
  },

  test: {
    projects: [
      { extends: true, test: { name: 'workspace', exclude: [...defaultExclude, 'apps/pro/**'] } },
      './apps/pro/vite-react-scss-modules/vitest.config.ts',
      './apps/pro/vite-react-tailwind/vitest.config.ts',
      './apps/pro/vite-react-vanilla-extract/vitest.config.ts',
      './apps/pro/next-scss-modules/vitest.config.ts',
      './apps/pro/next-tailwind/vitest.config.ts',
      './apps/pro/next-vanilla-extract/vitest.config.ts',
    ],
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    passWithNoTests: false,
  },
});
