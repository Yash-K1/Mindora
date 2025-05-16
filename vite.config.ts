import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true, // Open browser on server start
    port: 3000  // Use port 3000 by default
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser'
  }
}); 