import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/src/index.scss'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import './mock/'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import moment from 'moment'

// 引入初始化样式文件
import '@/styles/common.scss'

// // 引入懒加载指令插件并且注册
// import { lazyPlugin } from '@/directives'
// // 引入全局组件插件
// import { componentPlugin } from '@/components'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$moment = moment
app.use(ElementPlus)
const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(ElementPlusIconsVue)
// app.use(lazyPlugin)
// app.use(componentPlugin)
app.mount('#app')




