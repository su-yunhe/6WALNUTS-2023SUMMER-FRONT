import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { loginAPI } from '@/apis/user'
// import qs from 'qs'
import httpInstance from '@/utils/http'
import axios from 'axios'
import intro from "intro.js";
import "intro.js/minified/introjs.min.css";
import { inject } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 1. 定义管理用户数据的state
  const userInfo = ref({
    userid:'',
    username:'',
    authorization:'',
    email:'',
    realname:''
  })

  const pages = ref({
    teamId: '',
    proId:'',
    memberlist: [],
    visitMemberUsername: '',
    isNewUser: []
  })


const test = inject('$test')
// console.log(obj)
// console.log(window.location.pathname)
const handleStart = () => {
  const obj = test.find(item => item.path == window.location.pathname)
    console.log(obj)
    console.log(window.location.pathname)
    intro()
      .setOptions({
        prevLabel: `上一步`,
        nextLabel: `下一步`,
        doneLabel: `完成`,
        tooltipPosition: `bottom` /* 引导说明框相对高亮说明区域的位置 */,
        tooltipClass: `` /* 引导说明文本框的样式 */,
        highlightClass: `` /* 说明高亮区域的样式 */,
        exitOnOverlayClick: false /* 是否允许点击空白处退出 */,
        showStepNumbers: false /* 是否显示说明的数据步骤*/,
        keyboardNavigation: false /* 是否允许键盘来操作 */,
        showButtons: true /* 是否按键来操作 */,
        showBullets: true /* 是否使用点点点显示进度 */,
        showProgress: false /* 是否显示进度条 */,
        scrollToElement: false /* 是否滑动到高亮的区域 */,
        overlayOpacity: 0.5 /* 遮罩层的透明度 */,
        positionPrecedence: [
          `bottom`,
          `top`,
          `right`,
          `left`,
        ] /* 当位置选择自动的时候，位置排列的优先级 */,
        disableInteraction: true /* 是否禁止与元素的相互关联 */,
        hintPosition: "top-middle",
        steps: obj.value,
      })
      .start();
  }

  const loadMember = () => {
    console.log(pages.value.teamId)
    httpInstance.post("/getGroupInf",{
        groupId: pages.value.teamId
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
      userInfo.value = res.data
    })
    
  }

  // 3. 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {
      userid:'',
      username:'',
      authorization:'',
      email:'',
      realname:''
    }
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo,
    pages,
    loadMember,
    handleStart
  }
}, {
  persist: true,
})