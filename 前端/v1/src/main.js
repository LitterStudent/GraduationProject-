import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { setuStore } from './store'
const app = createApp(App)

app.use(router)
app.use(store)
setuStore()
app.use(ElementPlus)
app.mount('#app')
