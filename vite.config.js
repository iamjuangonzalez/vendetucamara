import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ponytail: en dev el front va por Vite y /api lo sirve `wrangler dev` en 8787.
  server: { proxy: { '/api': 'http://localhost:8787' } },
})
