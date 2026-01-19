import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
  // base 的寫法:
  // base: '/Repository 的名稱/'
  base: '/plantique-life/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
  server: {
    open: true,
  },
});
