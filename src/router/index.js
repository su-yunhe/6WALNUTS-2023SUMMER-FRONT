import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
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
import ProjectFile from '@/views/projectFile/index.vue'
import ProjectPrototype from '@/views/projectPrototype/index.vue'
import Message from '@/views/Message/index.vue'
import MessageReference from '@/views/Message/components/MessageReference.vue'
import DocumentReference from "@/views/Message/components/DocumentReference.vue";
import ChatReference from "@/views/Message/components/ChatReference.vue";
import UserInfo from '@/views/UserInfo/index.vue'
import UserMain from '@/views/UserMain/index.vue'
import ProtoView from '@/views/SingleProject/ProtoView/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        // 项目部分
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
        {
          path: '/projectPrototype/:id',
          component: ProjectPrototype
        },
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

      ]
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
      children: [
        {
          path: 'detail',
          name: 'detail',
          meta: {
            showFooter: false
          },
          children: [
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
            // 文章部分
            // 写文章
            {
              path: '/writeArticle',
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
      children: [
        { path: 'reference', component: MessageReference },
        { path: 'document', component: DocumentReference },
        { path: 'document', component: ChatReference }
      ]
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: UserInfo
    },
    {
      path: '/userMain',
      name: 'userMain',
      component: UserMain
    },
    {
      path: '/protoView',
      name: 'protoView',
      component: ProtoView
    }
  ]
})

export default router