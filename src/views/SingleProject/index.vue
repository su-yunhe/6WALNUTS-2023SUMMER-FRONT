<template>
  <div class="container">
    <el-container>
      <el-main>
        <div class="mainHeader">
          <el-page-header :icon="null" @back="onBack()">
            <template #content>
              <div class="flex items-center">
                <el-avatar :size="60" class="mr-3"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <span class="text-large font-600 mr-1"> 我的项目 > {{ oneProject.workName }} </span>
              </div>
            </template>
          </el-page-header>
        </div>
      </el-main>
    </el-container>
    <div>
      <div> 项目id: {{ oneProject.workId }}</div>
      <div> 项目名称: {{ oneProject.workName }}</div>
      <div>项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍</div>
      <div>项目文档项目文档项目文档项目文档项目文档项目文档项目文档项目文档项目文档项目文档项目文档项目文档项目文档项目文档项目文档项目文档</div>
    </div>
    <el-button plain>项目原型</el-button>
    <el-button plain @click="writeFile()">编写文档</el-button>
  </div>
</template>

<script setup>
// import { Delete, Plus, Finished } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import httpInstance from '@/utils/http'
import router from '@/router/index'
onMounted(() => {
  getOneProject()
})
// 定义某个项目变量
const oneProject = ref({})
// 获取这个项目
const getOneProject = async () => {
  await httpInstance.post('/get_single_work').then(res => {
    oneProject.value = res.results[0]
    console.log(oneProject.value)
  })
}


// 返回上一级
const onBack = () => {
  router.push({ path: '/project' })
}

// 编写文档
const writeFile = () => {
  router.push({ path: '/test' })
}
</script>

<style scoped>
.mainHeader {
  height: 100px;
  margin-bottom: 10px;
  padding: 20px 30px;
  background-color: rgba(251, 238, 221, 0.601);
}

.myAside {
  margin: 50px 0
}

.oneProject {
  margin-bottom: 10px
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.textHeader {
  font-size: 20px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

.projectBrief {
  /* height: 70px */
}
</style>