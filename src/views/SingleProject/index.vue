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
            <template #extra>
              <el-button round type="primary" @click="dialogFormVisible = true">重命名</el-button>
              <!-- 修改项目 -->
              <el-dialog v-model="dialogFormVisible" title="项目重命名">
                <el-form :model="oneProject">
                  <el-form-item label="项目名称">
                    <el-input v-model="oneProject.workName" autocomplete="off" />
                  </el-form-item>
                  <!-- <el-form-item label="项目负责人">
                    <el-input v-model="oneProject.leader" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="项目状态">
                    <el-input v-model="oneProject.workCondition" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="项目简介">
                    <el-input v-model="oneProject.workIntroduction" autocomplete="off" />
                  </el-form-item> -->
                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button round @click="dialogFormVisible = false">取消</el-button>
                    <el-button round type="primary" @click="rename()">
                      确定
                    </el-button>
                  </span>
                </template>
              </el-dialog>
            </template>
          </el-page-header>
        </div>
      </el-main>
    </el-container>
    <!-- 项目简介 -->
    <el-descriptions class="margin-top" :column="3" :size="small" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Coordinate />
            </el-icon>
            项目编号
          </div>
        </template>
        {{ oneProject.workId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            项目名称
          </div>
        </template>
        {{ oneProject.workName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <location />
            </el-icon>
            项目负责人
          </div>
        </template>
        {{ oneProject.leader }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            项目状态
          </div>
        </template>
        <el-tag size="small">{{ oneProject.workCondition }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            项目简介
          </div>
        </template>
        {{ oneProject.workIntroduction }}
      </el-descriptions-item>
    </el-descriptions>



    <div class="projectMain"></div>
    <el-row :gutter="12">
      <el-col :span="12">
        <div class="grid-content ep-bg-purple">
          <el-row :gutter="12">
            <el-col :span="24">
              <div class="oneProject">

                <el-card class="card1">
                  <div class="cardMain" @click="handleLink()">新建原型</div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="24" v-for="(item, index) in projectDesign" :key="index">
              <div class="oneProject">
                <el-card class="card2" @click="toArticle(item.fileId)">
                  <div class="cardMain">
                    <div>{{ item.fileName }}</div>
                    <div>{{ item.fileId }}</div>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content ep-bg-purple-light">
          <el-row :gutter="12">
            <el-col :span="24">
              <div class="oneProject">
                <el-card class="card3" @click="writeFile()">
                  <div class="cardMain">新建文档</div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="24" v-for="(item, index) in projectArticle" :key="index">
              <div class="oneProject">
                <el-card class="card4" @click="toArticle(item.fileId)">
                  <div class="cardMain">
                    <div class="detail">{{ item.fileName }}</div>
                    <div>{{ item.fileId }}</div>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// import { Delete, Plus, Finished } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import httpInstance from '@/utils/http'
// import router from '@/router/index'
import { useRoute, useRouter } from "vue-router"
import { openURL } from 'quasar'
const route = useRoute()
const router = useRouter()
// 定义某个项目变量
const oneProject = ref({})
// 定义项目文档变量
const projectArticle = ref([])
// 定义项目原型变量
const projectDesign = ref([])
const dialogFormVisible = ref(false)
// 钩子函数
onMounted(() => {
  getOneProject()
  getProjectArticle()
})

// 获取这个项目
const getOneProject = async () => {
  await httpInstance.post('/get_single_work').then(res => {
    oneProject.value = res.results[0]
    console.log(oneProject.value)
  })
}

// 获取项目文档列表
const getProjectArticle = async () => {
  await httpInstance.post('/get_work_file').then(res => {
    // console.log(res)
    projectArticle.value = res.results
    console.log(projectArticle.value)
  })
}


// 返回上一级
const onBack = () => {
  router.push({ path: '/project' })
}

// 编写文档
const writeFile = () => {
  router.push({ path: '/writeArticle' })
}

// 阅读某个文档
const toArticle = (id) => {
  console.log(id)
  router.push({ path: `/article/${id}` })
}

// 跳转
const handleLink = () => {
  // window.location.href = "www.baidu.com"
  window.open('http://localhost:8080/public/editor.html', '_blank')
}

// 项目重命名
const rename = async() => { 
  await httpInstance.post('/work_modify_name', {
    workname: oneProject.value.workName,
    workid: oneProject.value.workId
  }).then(res => {
    console.log(res)
    dialogFormVisible.value = false
    ElMessage({
    message: '项目重命名成功',
    type: 'success',
  })
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

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.projectMain {
  margin-top: 10px;
}

.cardMain {
  height: 150px;
}

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
</style>