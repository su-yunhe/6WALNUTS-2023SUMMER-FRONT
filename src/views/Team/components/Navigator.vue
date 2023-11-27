<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            router
            background-color="rgba(255,255,255,0.5)"
        >
            <el-menu-item index="/">
              <div style="font-family: 'Lucida';">6WALNUTS</div>
            </el-menu-item>
            <el-menu-item id="team" index="/team">团队</el-menu-item>
            <!-- <el-menu-item index="/">项目</el-menu-item> -->
            <el-menu-item id="message" index="message">消息中心</el-menu-item>
            <div class="flex-grow" />
            <el-menu-item>
              <el-avatar
                v-if="username != null"
                :size="50"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"  
              />
            </el-menu-item>
            <el-menu-item>
              <div v-if="username != null">
                {{ username }}，您好
              </div>
            </el-menu-item>
            <el-menu-item>
                <span @click="handleStart">
                    新手引导
                    <el-icon class="el-icon--right" justify-content="center">
                    <QuestionFilled/></el-icon>
                </span>
            </el-menu-item>
            <el-menu-item>
              <el-popconfirm
                  width="220"
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="确定要退出登录吗?"
                  @confirm="logout"
              >
                  <template #reference>
                  <el-link>退出登录</el-link>
                  </template>
              </el-popconfirm>
            </el-menu-item>
            
        </el-menu>
        <div class="h-6" />
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import router from '../../../router'
import intro from "intro.js";
import "intro.js/minified/introjs.min.css";
import { inject } from 'vue'
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
const userStore = useUserStore()
const username = userStore.userInfo.username

const logout = () => {
  userStore.clearUserInfo()
  router.push({name:'introduction'})
}
</script>

<style scoped>
.hello{
  position: absolute;
  margin-top: 18px;
  margin-left: 87%;
}

.flex-grow {
  flex-grow: 0.9;
}
</style>