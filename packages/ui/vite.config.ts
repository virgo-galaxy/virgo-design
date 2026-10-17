import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        'locale/index': fileURLToPath(new URL('./src/locale/index.ts', import.meta.url)),
        'metadata/index': fileURLToPath(new URL('./src/metadata/index.ts', import.meta.url)),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: 'styles',
    },

    sourcemap: true,

    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@virgo-design/icons',
        '@virgo-design/primitives',
      ],
    },
  },
});
