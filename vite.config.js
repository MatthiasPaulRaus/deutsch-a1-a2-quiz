import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/deutsch-a1-a2-quiz/',
  plugins: [react()],
})
