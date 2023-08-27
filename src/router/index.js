// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Test from '@/views/Test/index.vue'
import Chat from '@/views/Chat/index.vue'
import Team from '@/views/Team/index.vue'
import Detail from '@/views/Team/components/detail.vue'
import Member from '@/views/Team/components/member.vue'
import AllProject from '@/views/AllProject/index.vue'
import SingleProject from '@/views/SingleProject/index.vue'
import AddProject from '@/views/AddProject/index.vue'
import Message from '@/views/Message/index.vue'
import MessageReference from '@/views/Message/components/MessageReference.vue'
import DocumentReference from "@/views/Message/components/DocumentReference.vue";
import ChatReference from "@/views/Message/components/ChatReference.vue";
import UserInfo from '@/views/UserInfo/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        
      ]

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
      path: '/team',
      meta: {
        showFooter: true,
      },
      component: Team,
      name: 'team',
      children:[
        {
          path: 'detail',
          name: 'detail',
          meta: {
            showFooter: false
          },
          children:[
            {
              path: 'member',
              name: 'member',
              component: Member
            },
            {
              path: 'notice',
              name: 'notice',
              // component: Notice // TODO
            },
            {
              path: 'project',
              component: AllProject
            },
            {
              path: '/project/:id',
              component: SingleProject
            },
            {
              path: '/addproject',
              component: AddProject
            },
            {
              path: 'chat',
              name: 'chat'
            }
          ],
          component: Detail
        }
      ]
    },
    {
      path: '/message',
      component: Message,
      name: 'message',
      children:[
        {path:'reference',component:MessageReference},
        {path:'document',component:DocumentReference},
        {path:'document',component:ChatReference}
      ]
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: UserInfo
    }
  ]
})

export default router