import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import { GolbalRegister } from './global'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store'
const app = createApp(App)
// 注册 element组件
GolbalRegister(app)
// 每次刷新页面时可以注入 VUEX
app.use(store)
setupStore()
app.use(router)
app.mount('#app')
import './test'
module.hot?.accept('./test.ts', () => {
  console.log('test')
})
