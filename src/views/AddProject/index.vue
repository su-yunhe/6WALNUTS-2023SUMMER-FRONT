<template>
  <div class="container">
    <el-container>
      <el-main>
        <div class="mainHeader">
          <el-page-header :icon="null"  @back="onBack()">
            <template #content>
              <div class="flex items-center">
                <el-avatar :size="60" class="mr-3"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <span class="text-large font-600 mr-1"> 我的项目  > 新建项目 </span>
              </div>
            </template>
          </el-page-header>
        </div>
      </el-main>
    </el-container>
    <el-form :model="newProject" label-width="120px">
      <el-form-item label="项目名称">
        <el-input v-model="newProject.workname" />
      </el-form-item>
      <el-form-item label="项目负责人">
        <el-select v-model="newProject.leader" placeholder="苏云鹤">
          <el-option label="苏云鹤" value="苏云鹤" />
          <el-option label="周报据" value="周报据" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目简介">
        <el-input v-model="newProject.introduction" type="textarea" placeholder="请输入项目简介"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
// import { Delete, Plus, Finished } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import httpInstance from '@/utils/http'
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const isDelete = ref(false)
const newProject = ref({
  workname: '',
  groupid: 1,
  leader: '',
  workintroduction: ''
})

onMounted(() => {
  isDelete.value = false
})

const onSubmit = async () => {
  await httpInstance.post('/addwork', newProject).then(res => {
    console.log(res)
    router.push({ path: '/project' })
  })
}

// 返回上一级
const onBack = () => {
  router.push({ path: '/project' })
}

</script>

<style scoped>
.mainHeader {
  height: 100px;
  margin-bottom: 10px;
  padding: 20px 30px;
  background-color: #d9ecff83;
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