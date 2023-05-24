/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import path from 'path';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'CUI',
  plugins: [react()],
  resolve: {
    alias: {
      '@/app': path.resolve(__dirname, './src'),
      '@/features': path.resolve(
        __dirname,
        './node_modules/@skalenetwork/feat',
      ),
      '@/elements': path.resolve(
        __dirname,
        './node_modules/@skalenetwork/ux/elements',
      ),
      '@/components': path.resolve(
        __dirname,
        './node_modules/@skalenetwork/ux/components',
      ),
      process: path.resolve(__dirname, '../node_modules/process/browser.js'),
      // util: path.resolve(__dirname, '../node_modules/utils/index.js'),
      assert: path.resolve(__dirname, '../node_modules/assert/build/assert.js'),
    },
  },
  root: './',
  build: {
    outDir: './dist',
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    silent: true,
    includeSource: ['src/**/*.{js,ts}'],
  },
  define: {
    'import.meta.vitest': 'undefined',
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
