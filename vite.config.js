import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8082'
    }
  },
  plugins: [react()],
  assetsInclude: ['**/*.tgs'],
})

// '/api': 'http://173.249.55.207:8082'