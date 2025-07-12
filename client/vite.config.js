import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()], // !!
  server: {
    port: 3000,
    host: true,

    // ✅ ADD THIS PART to forward API calls to backend
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    exclude: ['crypto']
  },
  define: {
    global: 'globalThis'
  }
})
