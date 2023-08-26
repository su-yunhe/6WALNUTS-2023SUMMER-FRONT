// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Test from '@/views/Test/index.vue'
import Chat from '@/views/Chat/index.vue'
import User from '@/views/User/index.vue'
import Team from '@/views/Team/index.vue'
import Detail from '@/views/Team/components/detail.vue'
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
      name: 'login',
      component: Login
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/team',
      meta: {
        showFooter: true,
      },
      component: Team,
      name: 'team',
      children:[
        {
          path: 'detail/:id',
          name: 'detail',
          meta: {
            showFooter: false
          },
          component: Detail
        }
      ]
    },

  ]
})

export default router