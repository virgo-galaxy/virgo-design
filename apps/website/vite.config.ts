import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],

  server: {
    port: 6300,
    strictPort: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@virgo-design/colors': fileURLToPath(
        new URL('../../packages/colors/src/index.ts', import.meta.url),
      ),
      '@virgo-design/tokens': fileURLToPath(
        new URL('../../packages/tokens/src/index.ts', import.meta.url),
      ),
    },
  },
});
