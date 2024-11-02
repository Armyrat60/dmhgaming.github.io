import { defineConfig } from 'vite';

export default defineConfig({
  base: '/dmh-gaming/', // Add your repository name here
  server: {
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});