import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectDir = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(projectDir, 'src'),
    },
  },
  plugins: [
    react(),
  ],
  preview: {
    allowedHosts: true // Cho phép host trên Railway truy cập
  },
  server: {
    allowedHosts: true
  }
})
