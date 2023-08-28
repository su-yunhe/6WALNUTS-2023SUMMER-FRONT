import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { loginAPI } from '@/apis/user'
// import qs from 'qs'
import httpInstance from '@/utils/http'
import axios from 'axios'
export const useUserStore = defineStore('user', () => {
  // 1. 定义管理用户数据的state
  const userInfo = ref({})

  const pages = ref({
    teamId: '',
    memberlist: [],
    visitMemberUsername: '',
  })

  const loadMember = () => {
    console.log(pages.value.teamId)
    httpInstance.post("/getGroupInf",{
        groupid: pages.value.teamId
    }).then(res => {
        console.log(res.data)
        res.data.forEach(element => {
          pages.value.memberlist.push(element)
        })
    })
  }

  // 2. 定义获取接口数据的action函数
  const getUserInfo = async(loginForm) => {
    console.log(loginForm)
    await httpInstance.post('/login', loginForm).then(res => {
      console.log("res:", res)
      userInfo.value = res
    })
    
  }

  // 3. 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}

  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo,
    pages,
    loadMember,
  }
}, {
  persist: true,
})