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
      '@': path.resolve(__dirname, './src'),
      web3: 'web3/dist/web3.min.js',
      process: 'process/browser.js',
      util: 'util/util.js',
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
