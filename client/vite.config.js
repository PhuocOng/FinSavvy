import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 3000,
    host: true,
  },
  optimizeDeps: {
    exclude: ['crypto'],
  },
  define: {
    global: 'globalThis',
  },
  build: {
    chunkSizeWarningLimit: 1000, // 🔧 increase the limit (default is 500)
  },
});
