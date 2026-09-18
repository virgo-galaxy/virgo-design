import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],

  server: {
    port: 6302,
    strictPort: true,
  },

  resolve: {
    alias: {
      '@virgo-design/icons': fileURLToPath(
        new URL('../../packages/icons/src/index.ts', import.meta.url),
      ),
      '@virgo-design/primitives': fileURLToPath(
        new URL('../../packages/primitives/src/index.ts', import.meta.url),
      ),
      '@virgo-design/ui/metadata': fileURLToPath(
        new URL('../../packages/ui/src/metadata/index.ts', import.meta.url),
      ),
      '@virgo-design/ui': fileURLToPath(new URL('../../packages/ui/src/index.ts', import.meta.url)),
    },
  },
});
