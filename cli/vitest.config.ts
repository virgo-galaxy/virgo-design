import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  test: {
    name: 'create-virgo',
    environment: 'node',
    setupFiles: [],
    include: ['src/**/*.test.ts'],
  },
});
