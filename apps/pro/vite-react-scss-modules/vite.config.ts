import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { themeBootstrapPlugin } from '../../../config/theme-bootstrap-plugin.ts';
import defaults from './src/config/settings.json' with { type: 'json' };

export default defineConfig({
  plugins: [
    themeBootstrapPlugin({
      defaultTheme: defaults.theme,
      defaultAppearance: defaults.appearance as 'light' | 'dark' | 'system',
      storage: {
        key: 'virgo-pro:settings',
        themeField: 'theme',
        appearanceField: 'appearance',
      },
    }),
    react(),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          includeDependenciesRecursively: false,
          groups: [
            { name: 'charts-runtime', test: /node_modules[\\/]tslib[\\/]/ },
            { name: 'charts-engine', test: /node_modules[\\/]echarts[\\/]/ },
            { name: 'charts-renderer', test: /node_modules[\\/]zrender[\\/]/ },
          ],
        },
      },
    },
  },
  server: {
    port: 6301,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@virgo-design/charts/echarts': fileURLToPath(
        new URL('../../../packages/charts/src/echarts.tsx', import.meta.url),
      ),
      '@virgo-design/charts/sparkline': fileURLToPath(
        new URL('../../../packages/charts/src/native/Sparkline.tsx', import.meta.url),
      ),
      '@virgo-design/charts': fileURLToPath(
        new URL('../../../packages/charts/src/index.ts', import.meta.url),
      ),
      '@virgo-design/colors': fileURLToPath(
        new URL('../../../packages/colors/src/index.ts', import.meta.url),
      ),
      '@virgo-design/icons/brands/virgo-design.svg': fileURLToPath(
        new URL('../../../packages/icons/brands/virgo-design.svg', import.meta.url),
      ),
      '@virgo-design/icons/brands': fileURLToPath(
        new URL('../../../packages/icons/src/brands.ts', import.meta.url),
      ),
      '@virgo-design/icons/metadata': fileURLToPath(
        new URL('../../../packages/icons/src/metadata.ts', import.meta.url),
      ),
      '@virgo-design/icons/registry': fileURLToPath(
        new URL('../../../packages/icons/src/registry.ts', import.meta.url),
      ),
      '@virgo-design/icons/artwork/grok-bot.svg': fileURLToPath(
        new URL('../../../packages/icons/artwork/grok-bot.svg', import.meta.url),
      ),
      '@virgo-design/icons/artwork': fileURLToPath(
        new URL('../../../packages/icons/src/artwork.ts', import.meta.url),
      ),
      '@virgo-design/icons': fileURLToPath(
        new URL('../../../packages/icons/src/index.ts', import.meta.url),
      ),
      '@virgo-design/primitives': fileURLToPath(
        new URL('../../../packages/primitives/src/index.ts', import.meta.url),
      ),
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
      '@virgo-design/ui/locale': fileURLToPath(
        new URL('../../../packages/ui/src/locale/index.ts', import.meta.url),
      ),
      '@virgo-design/ui': fileURLToPath(
        new URL('../../../packages/ui/src/index.ts', import.meta.url),
      ),
    },
  },
});
