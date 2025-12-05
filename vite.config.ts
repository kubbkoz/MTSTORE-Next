import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Ensures process.env.API_KEY works in the built app if you use environment variables
    'process.env': process.env
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});