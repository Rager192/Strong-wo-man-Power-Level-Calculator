import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'], // <— hier!
  },
  esbuild: {
    jsx: 'automatic',
    include: /\.js$/, // <-- sagt Vite: auch .js als JSX behandeln
  },
});
