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
      '@virgo-design/primitives': fileURLToPath(
        new URL('../../packages/primitives/src/index.ts', import.meta.url),
      ),
    },
  },
});
