import { createApp } from 'vue'
//import './style.css'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/less/index.less'
import App from './App.vue'
import './api/mock.js'
import store from "./store/index.js";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import api from "./api/api.js";

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$api = api
app.use(router).use(store)
app.use(ElementPlus)
app.mount('#app')

