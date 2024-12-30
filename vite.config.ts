import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/workspace/gptina-chat/src'
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
