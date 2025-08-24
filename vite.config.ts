/// <reference types="vitest" />
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode, isSsrBuild }) => {
  // 테스트 환경에서는 reactRouter 플러그인 제외
  const plugins = [tailwindcss(), tsconfigPaths()];

  // 테스트 환경이 아닐 때만 reactRouter 플러그인 추가
  if (mode !== 'test') {
    plugins.push(reactRouter());
  }

  return {
    ssr: {
      external: ['node:async_hooks'],
    },
    build: {
      rollupOptions: {
        external: ['node:async_hooks'],
        input: isSsrBuild ? './server/app.ts' : undefined,
      },
    },
    server: {
      port: 3000,
    },
    test: {
      coverage: {
        provider: 'v8',
      },
      environment: 'jsdom',
      include: ['./app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      setupFiles: ['./vitest-setup.js'],
    },
    plugins,
  };
});
