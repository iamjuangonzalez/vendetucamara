import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
  // ponytail: en dev el front va por Vite y /api lo sirve `wrangler dev` en 8787.
  server: { proxy: { '/api': 'http://localhost:8787' } },
})
