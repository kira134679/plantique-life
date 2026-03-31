import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // base 的寫法:
    // base: '/Repository 的名稱/'
    base: env.VITE_REPO,
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
  };
});
