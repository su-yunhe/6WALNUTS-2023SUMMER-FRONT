<script setup>
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
const username = userStore.userInfo.username
</script>

<template>
  <!-- 一级路由出口组件 -->
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    router
  >
    <el-menu-item index="/team">团队</el-menu-item>
    <el-menu-item index="/">项目</el-menu-item>
    <el-menu-item index="message">消息中心</el-menu-item>
    <el-menu-item index="/user">个人信息</el-menu-item>
    <div class="hello">游客，您好</div>
    <el-avatar :size="50" :src="circleUrl" style="margin-top: 5px;margin-left: 60%;"/>
  </el-menu>
  <div class="h-6" />
  <RouterView />
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.el-menu-demo{
  border-radius: 10px;
  box-shadow: 1px 1px 5px #888888;
}

.hello{
  position: absolute;
  margin-top: 18px;
  margin-left: 92%;
}
</style>
