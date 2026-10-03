import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { rawScssSourcePlugin } from '../../config/raw-scss-source-plugin.ts';

export default defineConfig({
  plugins: [rawScssSourcePlugin(), react()],

  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'translations', test: /apps[\\/]website[\\/]src[\\/]i18n[\\/]registry\.ts$/ },
            {
              name: 'framework',
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
            },
            { name: 'i18n', test: /node_modules[\\/](i18next|react-i18next)[\\/]/ },
            { name: 'motion', test: /node_modules[\\/]gsap[\\/]/ },
          ],
        },
      },
    },
  },

  server: {
    port: 6300,
    strictPort: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@virgo-design/charts/echarts': fileURLToPath(
        new URL('../../packages/charts/src/echarts.tsx', import.meta.url),
      ),
      '@virgo-design/charts/sparkline': fileURLToPath(
        new URL('../../packages/charts/src/native/Sparkline.tsx', import.meta.url),
      ),
      '@virgo-design/charts': fileURLToPath(
        new URL('../../packages/charts/src/index.ts', import.meta.url),
      ),
      '@virgo-design/colors': fileURLToPath(
        new URL('../../packages/colors/src/index.ts', import.meta.url),
      ),
      '@virgo-design/icons/metadata': fileURLToPath(
        new URL('../../packages/icons/src/metadata.ts', import.meta.url),
      ),
      '@virgo-design/icons/registry': fileURLToPath(
        new URL('../../packages/icons/src/registry.ts', import.meta.url),
      ),
      '@virgo-design/icons/assets': fileURLToPath(
        new URL('../../packages/icons/src/assets.ts', import.meta.url),
      ),
      '@virgo-design/icons/tooling': fileURLToPath(
        new URL('../../packages/icons/src/tooling.ts', import.meta.url),
      ),
      '@virgo-design/icons': fileURLToPath(
        new URL('../../packages/icons/src/index.ts', import.meta.url),
      ),
      '@virgo-design/primitives': fileURLToPath(
        new URL('../../packages/primitives/src/index.ts', import.meta.url),
      ),
      '@virgo-design/tokens/styles.css': fileURLToPath(
        new URL('../../packages/tokens/dist/css/styles.css', import.meta.url),
      ),
      '@virgo-design/tokens': fileURLToPath(
        new URL('../../packages/tokens/src/index.ts', import.meta.url),
      ),
      '@virgo-design/ui/metadata': fileURLToPath(
        new URL('../../packages/ui/src/metadata/index.ts', import.meta.url),
      ),
      '@virgo-design/ui': fileURLToPath(new URL('../../packages/ui/src/index.ts', import.meta.url)),
    },
  },
});
