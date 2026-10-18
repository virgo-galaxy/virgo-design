import { fileURLToPath, URL } from 'node:url';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { themeBootstrapPlugin } from '../../../config/theme-bootstrap-plugin.ts';

export default defineConfig({
  plugins: [themeBootstrapPlugin({}), react(), vanillaExtractPlugin()],
  server: {
    port: 6303,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@virgo-design/colors': fileURLToPath(
        new URL('../../../packages/colors/src/index.ts', import.meta.url),
      ),
      '@virgo-design/tokens/styles.css': fileURLToPath(
        new URL('../../../packages/tokens/dist/css/styles.css', import.meta.url),
      ),
      '@virgo-design/tokens/vanilla-extract': fileURLToPath(
        new URL('../../../packages/tokens/src/vanilla-extract.ts', import.meta.url),
      ),
      '@virgo-design/tokens': fileURLToPath(
        new URL('../../../packages/tokens/src/index.ts', import.meta.url),
      ),
      '@virgo-design/themes/styles.css': fileURLToPath(
        new URL('../../../packages/themes/src/styles.scss', import.meta.url),
      ),
      '@virgo-design/themes': fileURLToPath(
        new URL('../../../packages/themes/src/index.ts', import.meta.url),
      ),
    },
  },
});
