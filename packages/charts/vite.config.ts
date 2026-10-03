import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        echarts: fileURLToPath(new URL('./src/echarts.tsx', import.meta.url)),
        sparkline: fileURLToPath(new URL('./src/native/Sparkline.tsx', import.meta.url)),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: 'styles',
    },
    sourcemap: true,
    rollupOptions: { external: (id) => /^(react|react-dom|echarts|zrender)(\/|$)/.test(id) },
  },
});
