import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  publicDir: 'public',
  envDir: path.resolve(__dirname, '..'),
  optimizeDeps: {
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      '@mui/styled-engine',
    ],
  },
});