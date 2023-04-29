/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
  },
  build: {
    outDir: './src/extension/bundle',
    rollupOptions: {
      input: './src/application/index.jsx',
      external(id) {
        return id.startsWith('./src./tests');
      },
      output: {
        dir: './src/extension/bundle',
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
});
