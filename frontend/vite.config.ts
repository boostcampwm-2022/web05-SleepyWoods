import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(configEnv => {
  const isDevelopment = configEnv.mode === 'development';
  const env = loadEnv(configEnv.mode, process.cwd());

  return {
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
          target: isDevelopment
            ? env.VITE_APP_LOCAL_BACKEND
            : env.VITE_APP_PROD_BACKEND,
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
  }
});