import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectDir = path.dirname(fileURLToPath(import.meta.url))

function reactRefreshPreambleFallback() {
  return {
    name: 'react-refresh-preamble-fallback',
    apply: 'serve',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, { server }) {
        // React modules can evaluate before their refresh globals unless the preamble runs first.
        if (html.includes('window.$RefreshSig$')) return

        const preamble = `import { injectIntoGlobalHook } from "${server.config.base}@react-refresh";
injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;`

        return [{
          tag: 'script',
          attrs: { type: 'module' },
          children: preamble,
          injectTo: 'head-prepend',
        }]
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(projectDir, 'src'),
    },
  },
  plugins: [
    react(),
    reactRefreshPreambleFallback(),
  ],
  preview: {
    allowedHosts: true // Cho phép host trên Railway truy cập
  },
  server: {
    allowedHosts: true
  }
})
