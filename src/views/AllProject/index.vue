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
                    <el-button type="primary" round>
                      新建
                      <el-icon class="el-icon--right">
                        <Plus />
                      </el-icon>
                    </el-button>
                  </template>
                </el-popconfirm>
                <el-button-group>
                  <el-button type="info" round @click="toReDelete()">
                    恢复
                    <el-icon class="el-icon--right">
                      <Delete />
                    </el-icon>
                  </el-button>
                  <el-button type="danger" round @click="toDelete()" v-if="!isDelete">
                    删除
                    <el-icon class="el-icon--right">
                      <Delete />
                    </el-icon>
                  </el-button>
                  <el-button round @click="toDelete()" v-else>
                    完成
                    <el-icon class="el-icon--right">
                      <Finished />
                    </el-icon>
                  </el-button>
                </el-button-group>
              </div>
            </template>
          </el-page-header>
        </div>

        <el-row :gutter="12">
          <el-col :span="8" v-for="(item, index) in allProject" :key="index">
            <div class="oneProject">
              <el-card shadow="hover">
                <template #header>
                  <div class="card-header">
                    <span @click="toSingleProject()">
                      <div class="textHeader">{{ item.workName }}</div>
                    </span>
                    <el-popconfirm title="确定删除这个项目吗？" @confirm="deleteProject(item.workId)">
                      <template #reference>
                        <el-button type="danger" :icon="Delete" circle size="small" v-if="isDelete" />
                      </template>
                    </el-popconfirm>

                  </div>
                </template>
                <div class="projectBrief" @click="toSingleProject()">
                  <!-- <el-descriptions>
                    <el-descriptions-item label="负责人">{{ item.leader }}</el-descriptions-item>
                    <el-descriptions-item label="创建时间">{{ item.create_time.slice(0, 10) }}</el-descriptions-item>
                    <el-descriptions-item label="状态">
                      <el-tag size="small">{{ item.workCondition }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="项目简介">
                      <p>{{ item.workIntroduction }}</p>
                    </el-descriptions-item>
                  </el-descriptions> -->

                  <div class="detail">项目负责人: {{ item.leader }}</div>
                  <div class="detail">创建时间: {{ item.create_time.slice(0, 10) }}</div>
                  <div class="detail">状态：<el-tag size="small">{{ item.workCondition }}</el-tag></div>
                  <div class="detail">项目简介：{{ item.workIntroduction }}</div>


                  <!-- <el-avatar shape="square" :size="100" :src="squareUrl" /> -->



                  <!-- <el-icon><Management /></el-icon> -->
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
// import router from '@/router/index'
import { useRoute, useRouter } from "vue-router"
import { ArrowDown } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const allProject = ref([])
const isDelete = ref(false)

onMounted(() => {
  console.log("onMounted")
  getAllProject()
  isDelete.value = false
})

// 当要删除项目时
const toDelete = () => {
  isDelete.value = !isDelete.value
}


// 获取所有项目
const getAllProject = async () => {
  await httpInstance.post('/get_all_work').then(res => {
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

// 恢复项目
const toReDelete = async() => {
  await httpInstance.get('/get_work_deleted').then(res => {
    console.log(res.results)
    allProject.value = res.results
  })
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
  text-align: center
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

.projectBrief {
  /* background-color: rgba(226, 231, 236, 0.242); */
  /* height: 70px */
}

.projectBrief .detail {
  margin: 5px 5px;
}
/* .el-card ::v-deep .el-card__header {
  padding: 2px 10px;
  background-color: palegoldenrod;
} */

.el-card {
  min-width: 380px;
  margin-right: 20px;
  transition: all .5s;
  background-color: rgba(226, 231, 236, 0.242);
}

.el-card:hover {
  margin-top: -5px;
  background-color: #d9ecff83;
  color: #79bbff
}

.el-descriptions {
  background-color: rgba(226, 231, 236, 0.242);
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
