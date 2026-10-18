import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { themeBootstrapPlugin } from '../../../config/theme-bootstrap-plugin.ts';

export default defineConfig({
  plugins: [themeBootstrapPlugin({}), react(), tailwindcss()],
  server: {
    port: 6302,
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
      '@virgo-design/tokens/tailwind.css': fileURLToPath(
        new URL('../../../packages/tokens/dist/css/tailwind.css', import.meta.url),
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
