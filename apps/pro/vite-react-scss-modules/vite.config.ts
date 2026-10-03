import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
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
      '@virgo-design/icons/metadata': fileURLToPath(
        new URL('../../../packages/icons/src/metadata.ts', import.meta.url),
      ),
      '@virgo-design/icons/registry': fileURLToPath(
        new URL('../../../packages/icons/src/registry.ts', import.meta.url),
      ),
      '@virgo-design/icons': fileURLToPath(
        new URL('../../../packages/icons/src/index.ts', import.meta.url),
      ),
      '@virgo-design/primitives': fileURLToPath(
        new URL('../../../packages/primitives/src/index.ts', import.meta.url),
      ),
      '@virgo-design/tokens/styles.css': fileURLToPath(
        new URL('../../../packages/tokens/dist/css/styles.css', import.meta.url),
      ),
      '@virgo-design/tokens': fileURLToPath(
        new URL('../../../packages/tokens/src/index.ts', import.meta.url),
      ),
      '@virgo-design/ui': fileURLToPath(
        new URL('../../../packages/ui/src/index.ts', import.meta.url),
      ),
    },
  },
});
