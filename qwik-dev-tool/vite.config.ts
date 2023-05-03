/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin(), visualizer() as PluginOption],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/test/setup.ts',
  },
  build: {
    outDir: './src/extension/bundle',
    rollupOptions: {
      input: './src/application/index.jsx',
      output: {
        dir: './src/extension/bundle',
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
});
