import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { loginAPI } from '@/apis/user'
// import qs from 'qs'
import httpInstance from '@/utils/http'
export const useUserStore = defineStore('user', () => {
  // 1. 定义管理用户数据的state
  const userInfo = ref({})
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
    clearUserInfo
  }
}, {
  persist: true,
})