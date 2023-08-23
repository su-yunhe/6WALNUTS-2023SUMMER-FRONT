// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Test from '@/views/Test/index.vue'
import AllProject from '@/views/AllProject/index.vue'
import SingleProject from '@/views/SingleProject/index.vue'
import AddProject from '@/views/AddProject/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/project',
          component: AllProject
        },
        {
          path: '/project/:id',
          component: SingleProject
        }, 
        {
          path: '/addproject',
          component: AddProject
        }
      ]

    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/test',
      component: Test
    }
  ]
})

export default router