/// <reference types="vitest" />
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
    },
    environment: 'jsdom',
    include: ['./app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['./vitest-setup.js'],
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
