import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': resolve(import.meta.dirname, './src'),
      react: resolve(import.meta.dirname, '../../node_modules/react'),
      'react-dom': resolve(import.meta.dirname, '../../node_modules/react-dom'),
    },
  },
  plugins: [react()],
  test: {
    server: {
      deps: {
        inline: ['react', 'react-dom', /@radix-ui/, 'react-tooltip'],
      },
    },
    environment: 'jsdom',
    setupFiles: [resolve(import.meta.dirname, '../../vitest.setup.ts')],
  },
});
