// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Test from '@/views/Test/index.vue'
import Message from '@/views/Message/index.vue'
import MessageReference from '@/views/Message/components/MessageReference.vue'
import DocumentReference from "@/views/Message/components/DocumentReference.vue";
import ChatReference from "@/views/Message/components/ChatReference.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '/message',
      component: Message,
      children:[
        {path:'reference',component:MessageReference},
        {path:'document',component:DocumentReference},
        {path:'document',component:ChatReference}
      ]
    },
  ]
})

export default router