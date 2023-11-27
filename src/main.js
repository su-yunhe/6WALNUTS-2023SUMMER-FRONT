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
// import Vue from 'vue'
// import 'vue-social-share/dist/client.css'
// 引入初始化样式文件
import '@/styles/common.scss'
// import QRCode from 'qrcode'
// import Share from 'vue-social-share'
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
// app.use(QRCode)
// app.use(Share)
// Vue.use(Share)

app.provide('$test', [
    {
      path: '/team', value: [
        {
          title: "查看所有的团队",
          element: "#team",
          intro: "会以卡片形式展示所有的团队，实现团队快速切换👋",
        },
        {
          title: "创建团队",
          element: "#createTeam",
          intro: "点击创建团队",
        },
        {
          title: "进入消息中心",
          element: "#message",
          intro: "这里可以查看收到的所有消息，包括群聊'@'、文档消息等",
        },
      ]
    },
    {
      path: '/team/detail/member', value: [
        {
          title: "查看团队成员",
          element: "#memberIntro",
          intro: "会以卡片形式展示所有的团队，实现团队快速切换👋",
        },
        {
          title: "团队项目",
          element: "#projectIntro",
          intro: "在这里团队中的所有项目，进入项目页面",
        },
        {
          title: "团队交流",
          element: "#chatIntro",
          intro: "进入团队群聊，每个团队都有一个包含所有成员的默认群聊",
        },
        {
          title: "我的身份",
          element: "#typeIntro",
          intro: "这里显示在团队中的身份，不同身份权限可进行不同操作",
        }
      ]
    }
  ])
app.mount('#app')

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});


