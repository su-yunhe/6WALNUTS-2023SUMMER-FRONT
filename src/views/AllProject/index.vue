<template>
  <div class="container">
    <el-container>
      <el-main>
        <div class="mainHeader">
          <el-page-header :icon="null">
            <template #content>
              <div class="flex items-center">
                <el-avatar :size="60" class="mr-3"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <span class="text-large font-600 mr-1"> 我的项目 </span>
              </div>
            </template>
            <template #extra>
              <div class="flex items-center">
                <el-popconfirm title="您将新建一个项目~" @confirm="addProject()">
                  <template #reference>
                    <el-button type="primary" plain >
                      新建项目
                      <el-icon class="el-icon--right">
                        <Plus />
                      </el-icon>
                    </el-button>
                  </template>
                </el-popconfirm>

                <el-button type="danger" plain @click="toDelete()" v-if="!isDelete">
                  删除
                  <el-icon class="el-icon--right">
                    <Delete />
                  </el-icon>
                </el-button>
                <el-button plain @click="toDelete()" v-else>
                  完成
                  <el-icon class="el-icon--right">
                    <Finished />
                  </el-icon>
                </el-button>
              </div>
            </template>
          </el-page-header>
        </div>

        <el-row :gutter="12">
          <el-col :span="12" v-for="(item, index) in allProject" :key="index">
            <div class="oneProject">
              <el-card shadow="hover">
                <template #header>
                  <div class="card-header">
                    <span @click="toSingleProject()">
                      <div class="textHeader">{{item.workName}}</div>
                    </span>
                    <el-popconfirm title="确定删除这个项目吗？"  @confirm="deleteProject(item.workId)">
                      <template #reference>
                        <el-button type="danger" :icon="Delete" circle size="small" v-if="isDelete" />
                      </template>
                    </el-popconfirm>

                  </div>
                </template>
                <div class="projectBrief" @click="toSingleProject()">
                  <el-descriptions>
                    <el-descriptions-item label="负责人">{{item.leader}}</el-descriptions-item>
                    <el-descriptions-item label="创建时间">{{item.create_time}}</el-descriptions-item>
                    <el-descriptions-item label="状态">
                      <el-tag size="small">{{item.workCondition}}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="项目简介">
                      <p>{{ item.workIntroduction }}</p>
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { Delete, Plus, Finished } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import httpInstance from '@/utils/http'
import router from '@/router/index'
onMounted(() => {
  console.log("onMounted")
  getAllProject()
  isDelete.value = false
})
// 当要删除项目时
const isDelete = ref(false)
const toDelete = () => {
  isDelete.value = !isDelete.value
}

// 所有项目
const allProject = ref([])
// 获取所有项目
const getAllProject = async () => {
  await httpInstance.get('get_all_work').then(res => {
    console.log(res.results)
    allProject.value = res.results
    console.log(allProject)
  })
}

// 删除项目
const deleteProject = async (id) => {
  console.log(id)
  await httpInstance.post('/work_modify_condition', {
    isdelete: true,
    workid: id
  }).then(res => {
    console.log(res)
    
    getAllProject()
  })
}
// 跳转到某一个具体项目
const toSingleProject = () => {
  console.log("跳转到某一个具体项目")
  router.push({ path: '/project/1' })
}

// 新增项目
const addProject = () => {
  router.push({ path: '/addproject' })
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
