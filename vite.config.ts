import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import eslint from 'vite-plugin-eslint';
import suidPlugin from '@suid/vite-plugin';

export default defineConfig({
  plugins: [
    suidPlugin(),
    solidPlugin(),
    { // default settings on build (i.e. fail on error)
      ...eslint(),
      apply: 'build',
    },
    { // do not fail on serve (i.e. local development)
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: 'serve',
      enforce: 'post'
    }],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
