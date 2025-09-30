// vite.config.js
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname), // 设置根目录为当前文件夹
  plugins: [uni()],
  resolve: {
    alias: {
	  '@': path.resolve(__dirname),
      '@dcloudio/uni-ui': '/node_modules/@dcloudio/uni-ui'
    },
	extensions: ['.js', '.ts', '.json', '.vue']
  }
})