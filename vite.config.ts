import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { studioProxy } from './scripts/studio-proxy.mjs'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue(), {
    name: 'aigokey-studio-api',
    configureServer(server) { server.middlewares.use(studioProxy) },
    configurePreviewServer(server) { server.middlewares.use(studioProxy) },
  }],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
