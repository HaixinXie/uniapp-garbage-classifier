// vite.config.js
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': '/src',
      '@dcloudio/uni-ui': '/node_modules/@dcloudio/uni-ui'
    }
  }
})