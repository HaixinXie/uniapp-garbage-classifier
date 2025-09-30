import App from './App'
import pinia from './stores'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.use(pinia) // 在 Vue 2 中使用 pinia (可能需要适配)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia) // 关键：在 Vue 3 中使用 pinia
  return {
    app,
    pinia // 可选：返回 pinia 实例供其他地方使用
  }
}
// #endif