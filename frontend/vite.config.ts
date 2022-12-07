import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://sleepywoods.kr',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
    open: '/',
  },
  base: './',
  build: {
    assetsInlineLimit: 0
  },
});