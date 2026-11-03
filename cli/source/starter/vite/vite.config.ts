import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { themeBootstrapPlugin } from './config/theme-bootstrap-plugin.ts';
import { appearanceStorageKey } from './src/preferences/appearance.ts';

export default defineConfig({
  plugins: [
    themeBootstrapPlugin({
      defaultAppearance: 'system',
      appearanceStorageKey,
      respectServerAttributes: true,
    }),
    react(),
    tailwindcss(),
  ],
  server: { strictPort: true },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
});
