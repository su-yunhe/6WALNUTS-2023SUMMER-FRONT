import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/UserLogin.vue'
import Home from '@/views/Home/index.vue'
import WriteArticle from '@/views/WriteArticle/index.vue'
import ReadArticle from '@/views/ReadArticle/index.vue'
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
import Introduction from '@/views/Introduction/index.vue'
import ProjectFile from '@/views/ProjectFile/index.vue'
import ProtoView from '@/views/SingleProject/ProtoView/index.vue'
// import ProjectPrototype from '@/views/projectPrototype/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      name: 'introduction',
      component: Introduction
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
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
              path: 'chat',
              name: 'chat'
            }
          ],
          component: Detail
        }
      ]
    },
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
    },
    {
      path: '/projectFile/:projectId/:projectName',
      // name: 'projectFile',
      component: ProjectFile
    },
    // {
    //   path: 'projectPrototype/:id',
    //   component: ProjectPrototype
    // },
    // 文章部分
    // 写文章
    {
      path: '/writeArticle/:projectId',
      component: WriteArticle
    },
    // 读文章
    {
      path: '/article/:id',
      component: ReadArticle
    },
    // 修改文章
    {
      path: '/modifyArticle/:id',
      component: WriteArticle
    },
    {
      path: '/protoView',
      component: ProtoView
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