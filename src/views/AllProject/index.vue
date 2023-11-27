<template>
  <div class="container">
    <div class="header">
      <div class="name">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span> 团队项目</span>

      </div>
      <div class="search">
        <div class="box">
          <div class="searchBox">
            <input type="text" v-model="searchProject" placeholder="搜索项目名称" class="searchInput"
              style="padding-left: 10px;">
            <input type="button" @click="_search()" value="搜索" class="searchButton">
          </div>
        </div>
      </div>
      <div class="button">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-button type="success">排序</el-button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="sortProject(1)">由新到旧</el-dropdown-item>
              <el-dropdown-item @click="sortProject(2)">由旧到新</el-dropdown-item>
              <el-dropdown-item @click="sortProject(3)">负责人</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button type="success" @click="recoverProject1()">恢复</el-button>
        <el-button type="success" @click="addProject()">新建</el-button>
      </div>
    </div>
    <div class="_main">

      <!-- 项目重命名弹框 -->
      <el-dialog v-model="dialogFormVisible" title="项目重命名">
        <el-form :model="renameProject">
          <el-form-item label="新名称">
            <el-input v-model="renameProject.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button round @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" round @click="rename()">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 恢复项目弹框 -->
      <el-dialog v-model="dialogFormVisible2" title="恢复项目">
        <el-select v-model="recoverProjectId" placeholder="请选择要恢复的项目">
          <el-option v-for="(item, index) in deletedProject" :key="index" 
            :label="'项目id: ' + item.workId + '   ' + '项目名称: ' + item.workName"
            :value="item.workId">
          </el-option>
        </el-select>
        <template #footer>
          <span class="dialog-footer">
            <el-button round @click="dialogFormVisible2 = false">取消</el-button>
            <el-button type="primary" round @click="recoverProject2()">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
      <el-row :gutter="20">

        <el-col :span="6" v-for="(item, index) in paginatedData" :key="index">
          <!-- <div>{{ item }}</div> -->
          <div class="main">
            <div class="card" @click="toSingleProject(item.workId)">
              <div class="fl">
                <div class="fullscreen">

                </div>
              </div>
              <div class="card_content">
                <label class="switch_738">
                  <input type="checkbox" class="chk_738">
                  <span class="slider_738"></span>
                </label>
              </div>
              <div class="card_back"></div>
            </div>
            <div class="data">
              <div class="img">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 80 80">
                  <g stroke-width="2.00" fill="none" stroke-linecap="butt">
                    <path stroke="#59afb1" d="M 14.06 0.00
        Q 13.33 4.09 13.93 7.52
        A 1.04 1.02 -78.7 0 0 14.37 8.19
        L 32.87 20.19"></path>
                    <path stroke="#4fa6a8" d="M 32.87 20.19
        L 42.25 26.79"></path>
                    <path stroke="#69cbc0" d="M 42.25 26.79
        C 41.40 28.26 24.14 34.92 21.32 36.20"></path>
                    <path stroke="#6fcdbb" d="M 21.32 36.20
        Q 15.81 38.21 11.00 41.21"></path>
                    <path stroke="#5ec8ab" d="M 11.00 41.21
        L 9.75 40.96"></path>
                    <path stroke="#5cae9e" d="M 9.75 40.96
        Q 5.99 37.71 1.71 35.19
        A 1.00 1.00 0.0 0 0 0.22 35.85
        L 0.00 36.94"></path>
                    <path stroke="#3190a6" d="M 79.95 6.12
        L 62.46 11.32"></path>
                    <path stroke="#3a96a3" d="M 62.46 11.32
        Q 47.42 14.67 32.87 20.19"></path>
                    <path stroke="#22a3be" d="M 80.00 11.06
        L 64.50 17.46"></path>
                    <path stroke="#28879d" d="M 64.50 17.46
        L 62.46 11.32"></path>
                    <path stroke="#2ba9bb" d="M 64.50 17.46
        L 43.00 26.96"></path>
                    <path stroke="#4ab2b2" d="M 43.00 26.96
        L 42.25 26.79"></path>
                    <path stroke="#45ced3" d="M 80.00 52.31
        Q 71.64 45.91 62.46 40.67"></path>
                    <path stroke="#13636e" d="M 62.46 40.67
        Q 62.43 36.88 58.50 36.79"></path>
                    <path stroke="#45ced3" d="M 58.50 36.79
        Q 50.07 32.95 43.00 26.96"></path>
                    <path stroke="#326b65" d="M 58.50 36.79
        Q 55.85 40.04 56.86 44.07
        C 57.53 46.71 60.02 47.68 61.77 45.19
        Q 61.91 44.99 61.94 44.74
        L 62.46 40.67"></path>
                    <path stroke="#59d4b5" d="M 40.81 79.86
        Q 46.22 74.94 52.34 70.94
        A 1.00 1.00 0.0 0 0 52.39 69.30
        Q 44.74 63.65 43.10 62.62
        Q 34.11 56.98 32.50 55.79"></path>
                    <path stroke="#6ad8c5" d="M 32.50 55.79
        C 36.74 55.42 30.64 48.79 29.79 47.81
        C 27.54 45.21 26.34 42.09 24.05 39.44
        Q 22.66 37.82 21.32 36.20"></path>
                    <path stroke="#326b65" d="M 48.75 39.07
        A 2.30 2.30 0.0 0 0 46.45 36.77
        L 46.05 36.77
        A 2.30 2.30 0.0 0 0 43.75 39.07
        L 43.75 44.21
        A 2.30 2.30 0.0 0 0 46.05 46.51
        L 46.45 46.51
        A 2.30 2.30 0.0 0 0 48.75 44.21
        L 48.75 39.07"></path>
                    <path stroke="#326b65" d="M 58.63 54.41
        C 54.90 57.18 50.72 56.87 46.91 54.39
        A 1.00 0.99 51.9 0 0 46.04 54.28
        C 42.37 55.52 43.88 58.13 46.28 59.41
        Q 53.38 63.20 60.15 58.94
        C 62.54 57.43 62.47 54.80 59.41 54.23
        A 1.00 1.00 0.0 0 0 58.63 54.41"></path>
                    <path stroke="#4bb793" d="M 9.75 40.96
        Q 5.15 43.50 0.05 44.46"></path>
                    <path stroke="#5fd6b0" d="M 32.50 55.79
        L 11.00 41.21"></path>
                    <path stroke="#48d08e" d="M 11.19 80.00
        Q 12.51 79.61 11.57 78.67
        Q 5.99 73.11 1.70 65.70
        C 1.28 64.97 0.74 64.76 0.00 65.19"></path>
                  </g>
                  <path fill="#6ebfb6" d="M 0.00 0.00
        L 14.06 0.00
        Q 13.33 4.09 13.93 7.52
        A 1.04 1.02 -78.7 0 0 14.37 8.19
        L 32.87 20.19
        L 42.25 26.79
        C 41.40 28.26 24.14 34.92 21.32 36.20
        Q 15.81 38.21 11.00 41.21
        L 9.75 40.96
        Q 5.99 37.71 1.71 35.19
        A 1.00 1.00 0.0 0 0 0.22 35.85
        L 0.00 36.94
        L 0.00 0.00
        Z"></path>
                  <path fill="#439eac" d="M 14.06 0.00
        L 80.00 0.00
        L 79.95 6.12
        L 62.46 11.32
        Q 47.42 14.67 32.87 20.19
        L 14.37 8.19
        A 1.04 1.02 -78.7 0 1 13.93 7.52
        Q 13.33 4.09 14.06 0.00
        Z"></path>
                  <path fill="#1f81a0" d="M 79.95 6.12
        L 80.00 11.06
        L 64.50 17.46
        L 62.46 11.32
        L 79.95 6.12
        Z"></path>
                  <path fill="#308d99" d="M 62.46 11.32
        L 64.50 17.46
        L 43.00 26.96
        L 42.25 26.79
        L 32.87 20.19
        Q 47.42 14.67 62.46 11.32
        Z"></path>
                  <path fill="#25c5dc" d="M 80.00 11.06
        L 80.00 52.31
        Q 71.64 45.91 62.46 40.67
        Q 62.43 36.88 58.50 36.79
        Q 50.07 32.95 43.00 26.96
        L 64.50 17.46
        L 80.00 11.06
        Z"></path>
                  <path fill="#64d6ca" d="M 42.25 26.79
        L 43.00 26.96
        Q 50.07 32.95 58.50 36.79
        Q 55.85 40.04 56.86 44.07
        C 57.53 46.71 60.02 47.68 61.77 45.19
        Q 61.91 44.99 61.94 44.74
        L 62.46 40.67
        Q 71.64 45.91 80.00 52.31
        L 80.00 80.00
        L 40.81 79.86
        Q 46.22 74.94 52.34 70.94
        A 1.00 1.00 0.0 0 0 52.39 69.30
        Q 44.74 63.65 43.10 62.62
        Q 34.11 56.98 32.50 55.79
        C 36.74 55.42 30.64 48.79 29.79 47.81
        C 27.54 45.21 26.34 42.09 24.05 39.44
        Q 22.66 37.82 21.32 36.20
        C 24.14 34.92 41.40 28.26 42.25 26.79
        Z
        M 48.75 39.07
        A 2.30 2.30 0.0 0 0 46.45 36.77
        L 46.05 36.77
        A 2.30 2.30 0.0 0 0 43.75 39.07
        L 43.75 44.21
        A 2.30 2.30 0.0 0 0 46.05 46.51
        L 46.45 46.51
        A 2.30 2.30 0.0 0 0 48.75 44.21
        L 48.75 39.07
        Z
        M 58.63 54.41
        C 54.90 57.18 50.72 56.87 46.91 54.39
        A 1.00 0.99 51.9 0 0 46.04 54.28
        C 42.37 55.52 43.88 58.13 46.28 59.41
        Q 53.38 63.20 60.15 58.94
        C 62.54 57.43 62.47 54.80 59.41 54.23
        A 1.00 1.00 0.0 0 0 58.63 54.41
        Z"></path>
                  <path fill="#499c85" d="M 9.75 40.96
        Q 5.15 43.50 0.05 44.46
        L 0.00 36.94
        L 0.22 35.85
        A 1.00 1.00 0.0 0 1 1.71 35.19
        Q 5.99 37.71 9.75 40.96
        Z"></path>
                  <path fill="#70dac0" d="M 21.32 36.20
        Q 22.66 37.82 24.05 39.44
        C 26.34 42.09 27.54 45.21 29.79 47.81
        C 30.64 48.79 36.74 55.42 32.50 55.79
        L 11.00 41.21
        Q 15.81 38.21 21.32 36.20
        Z"></path>
                  <rect fill="#000000" x="43.75" y="36.77" width="5.00" height="9.74" rx="2.30"></rect>
                  <path fill="#000000" d="M 58.50 36.79
        Q 62.43 36.88 62.46 40.67
        L 61.94 44.74
        Q 61.91 44.99 61.77 45.19
        C 60.02 47.68 57.53 46.71 56.86 44.07
        Q 55.85 40.04 58.50 36.79
        Z"></path>
                  <path fill="#4dd1a0" d="M 9.75 40.96
        L 11.00 41.21
        L 32.50 55.79
        Q 34.11 56.98 43.10 62.62
        Q 44.74 63.65 52.39 69.30
        A 1.00 1.00 0.0 0 1 52.34 70.94
        Q 46.22 74.94 40.81 79.86
        L 11.19 80.00
        Q 12.51 79.61 11.57 78.67
        Q 5.99 73.11 1.70 65.70
        C 1.28 64.97 0.74 64.76 0.00 65.19
        L 0.05 44.46
        Q 5.15 43.50 9.75 40.96
        Z"></path>
                  <path fill="#000000" d="M 46.91 54.39
        C 50.72 56.87 54.90 57.18 58.63 54.41
        A 1.00 1.00 0.0 0 1 59.41 54.23
        C 62.47 54.80 62.54 57.43 60.15 58.94
        Q 53.38 63.20 46.28 59.41
        C 43.88 58.13 42.37 55.52 46.04 54.28
        A 1.00 0.99 51.9 0 1 46.91 54.39
        Z"></path>
                  <path fill="#43ce7c" d="M 11.19 80.00
        L 0.00 80.00
        L 0.00 65.19
        C 0.74 64.76 1.28 64.97 1.70 65.70
        Q 5.99 73.11 11.57 78.67
        Q 12.51 79.61 11.19 80.00
        Z"></path>
                </svg>
              </div>
              <div class="_text">
                <div class="text_m">{{ item.workName }}</div>
                <div class="text_s">
                  <div>创建日期: {{ item.create_time.slice(0, 10) }}</div>
                  <div>负责人：{{ item.leader }}</div>
                </div>
              </div>
            </div>
            <div class="btns">
              <el-popconfirm title="确定删除这个项目吗？" @confirm="deleteProject(item.workId)">
                <template #reference>
                  <div class="likes">
                    <span class="likes_text">删除</span>
                  </div>
                </template>
              </el-popconfirm>

              <div class="comments" @click="chooceRenameProject(item.workId)">
                <span class="comments_text">重命名</span>
              </div>
              <div class="views">
                <span class="views_text" @click="copyProject(item.workId)">复制</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
        :total="allProject.length" />
    </div>

  </div>
</template>

<script setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import { ref, onMounted, computed } from 'vue'
import httpInstance from '@/utils/http'
// import router from '@/router/index'
import { useRoute, useRouter } from "vue-router"
import { ArrowDown } from '@element-plus/icons-vue'
import { ElDropdown, ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const route = useRoute()
const router = useRouter()
const allProject = ref([])
const isDelete = ref(false)
const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)
const renameProject = ref({
  id: '',
  name: ''
})
const deletedProject = ref([])
const recoverProjectId = ref(0)
const searchProject = ref('')
const currentPage = ref(1);
const pageSize = ref(8);
onMounted(async() => {
  console.log("onMounted")
  getAllProject()
  isDelete.value = false
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return allProject.value.slice(start, end);
});

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
}

// 当要删除项目时
const toDelete = () => {
  isDelete.value = !isDelete.value
}


// 获取所有项目
const getAllProject = async () => {
  await httpInstance.post('/get_all_work', {
    groupId: userStore.pages.teamId
  }).then(res => {
    console.log(res.results)
    allProject.value = res.results
    console.log(allProject)
  })
}


// 删除项目
const deleteProject = async (id) => {
  console.log(id)
  await httpInstance.post('/work_modify_condition', {
    isDelete: 'True',
    workId: id
  }).then(res => {
    ElMessage({
      message: '项目删除成功~ 可在回收站恢复',
      type: 'success',
    })
    getAllProject()
  })
}

// 复制项目
const copyProject = async (id) => {
  await httpInstance.post('/work_copy', {
    workId: id,
  }).then(res => {
    ElMessage({
      message: '已成功为该项目创建副本~',
      type: 'success',
    })
    getAllProject()
  })
}

// 项目排序
const sortProject = (op) => {
  if (op === 1) { // 有新到旧
    allProject.value.sort((a, b) => b.workId - a.workId)
  } else if (op === 2) { // 由旧到新
    allProject.value.sort((a, b) => a.workId - b.workId)
  } else if (op === 3) { // 项目负责人
    allProject.value.sort((a, b) => a.leader.toString().localeCompare(b.leader.toString()))
  }
}

// 跳转到某一个具体项目
const toSingleProject = (id) => {
  console.log(id)
  router.push({ path: `/project/${id}` })
}

// 新增项目
const addProject = () => {
  router.push({ path: '/addproject' })
}

// 恢复项目(第一步)
const recoverProject1 = async () => {
  await httpInstance.get('/get_work_deleted').then(res => {
    console.log(res.results)
    deletedProject.value = res.results
    dialogFormVisible2.value = true
  })
}

// 恢复项目(第二步)
const recoverProject2 = async () => {
  // console.log(recoverProjectId.value)
  await httpInstance.post('/work_modify_condition', {
    isDelete: 'False',
    workId: recoverProjectId.value
  }).then(res => {
    dialogFormVisible2.value = false
    ElMessage({
      message: '该项目已被成功恢复~',
      type: 'success',
    })
    getAllProject()
  })
  
}

// 项目重命名
// 1. 
const chooceRenameProject = (id) => {
  renameProject.value.id = id
  dialogFormVisible.value = true
}

// 2. 
const rename = async () => {
  await httpInstance.post('/work_modify_name', {
    workName: renameProject.value.name,
    workId: renameProject.value.id
  }).then(res => {
    console.log(res)
    dialogFormVisible.value = false
    ElMessage({
      message: '项目重命名成功',
      type: 'success',
    })
  })
  getAllProject()
}

// 项目搜索
const _search = async () => {
  console.log(searchProject.value)
  await httpInstance.post('/work_search', {
    workName: searchProject.value
  }).then(res => {
    console.log(res)
    allProject.value = res.results
  })
}
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  display: flex;

  // background-image: url("@/assets/images/center-bg.png");
  .name {
    height: 60px;
    width: 13.4%;
    line-height: 60px;
    text-align: center;
    padding-top: 20px;
    font-weight: bold;
    font-size: 18px;

  }

  .search {
    height: 60px;
    width: 73.3%;

    .box {
      margin: 0 auto;
      padding-top: 25px;
      height: 50px;
      width: 80%;
    }

    .searchBox {
      margin: 0 auto;
      width: 60%;
      position: relative;
    }

    .searchInput {
      display: inline-block;
      width: 85%;
      height: 38px;
      border: 2px solid rgb(109, 159, 254);
      border-right: 0;
      float: left;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      /* Firefox */
      -webkit-box-sizing: border-box;
      /* Safari */
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
    }

    .searchButton {
      display: inline-block;
      width: 15%;
      height: 38px;
      line-height: 40px;
      float: left;
      background-color: rgb(109, 159, 254);
      font-size: 16px;
      cursor: pointer;
      border-bottom-right-radius: 20px;
      border-top-right-radius: 20px;
      border: none;
      color: #fff;
    }
  }

  .button {
    height: 60px;
    width: 13.3%;
    // background-color: rgb(192, 255, 231);
    padding-top: 25px;
  }
}

._main {
  height: 65vh;
  margin: 2.5% 2.5%;
  padding: 30px 20px;
  background-color: rgb(252, 252, 252);
  // background: #eeeeee;
  /* CodePen Card */
  // box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  border-radius: 10px;
  // border-width: 1px;
  box-shadow: rgb(229, 231, 233) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.468) -3px -3px 6px 1px inset;

  .card {
    width: 250px;
    height: 150px;
    margin-left: 30px;
    // background-color: #252525;
    background-image: url("@/assets/images/center-bg.png");
    border-radius: 10px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 2px;
  }


  .fl {
    display: flex;
    justify-content: flex-end;
    opacity: 0;
    transition: .2s ease-in-out;
  }

  .fl:hover .fullscreen {
    scale: 5;
  }

  .fl:hover .fullscreen_svg {
    fill: white;
  }

  .fullscreen {
    width: 1.5em;
    height: 1.5em;
    border-radius: 5px;
    background-color: #a8acbc;
    margin: 1em;
    margin-right: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .2s ease-in-out;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, .4);
  }

  .fullscreen_svg {
    width: 15px;
    height: 15px;
    fill: rgb(177, 176, 176);
    transition: .2s ease-in-out;
  }

  .card_back {
    position: absolute;
    width: 15em;
    height: 13em;
    background-color: rgba(30, 31, 38, 0.575);
    border-radius: 7px;
    margin-top: -5em;
    margin-left: 0.7em;
    transition: .2s ease-in-out;
    z-index: -1;
  }

  .main {
    margin-bottom: 10px;
  }

  .main:hover .card_back {
    margin-top: -6.25em;
    margin-left: 0em;
    scale: 1.1;
    height: 15.25em;
    cursor: pointer;
  }

  .main:hover .fl {
    opacity: 1;
    cursor: pointer;
    margin-right: 0.5em;
  }

  .data {
    display: flex;
    flex-direction: row;
    margin-top: 1em;
  }

  .img {
    width: 2.25em;
    height: 2.25em;
    background-color: #252525;
    border-radius: 5px;
    overflow: hidden;
  }

  ._text {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 4em;
    font-family: Montserrat;
    color: rgb(73, 73, 73);
  }

  .text_m {
    font-weight: bold;
    font-size: 1.2em;
  }

  .text_s {
    font-size: 0.7em;
  }

  .btns {
    display: flex;
    gap: 0.5em;
    transition: .2s ease-in-out;
  }

  .likes {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5em;
    height: 1.4em;
    border-radius: 4px;
    margin-top: -0.5em;
    opacity: 0;
    background-color: #ff4f4f;
    transition: .2s ease-in-out;
  }

  .likes_text {
    font-family: Montserrat;
    font-size: 0.8em;
    margin-left: 0.25em;
    color: white;
  }

  .likes_svg {
    width: 12px;
    height: 12px;
    fill: white;
  }

  .likes:hover {
    background-color: #5A5F73;
    cursor: pointer;
  }

  .comments {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.2em;
    height: 1.4em;
    border-radius: 4px;
    margin-top: -0.5em;
    opacity: 0;
    background-color: #0a3fff;
    transition: .24s ease-in-out;
  }

  .comments_text {
    font-family: Montserrat;
    font-size: 0.8em;
    margin-left: 0.25em;
    color: white;
  }

  .comments_svg {
    width: 12px;
    height: 12px;
    fill: white;
  }

  .comments:hover {
    background-color: #5A5F73;
    cursor: pointer;
  }

  .views {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3em;
    height: 1.4em;
    border-radius: 4px;
    margin-top: -0.5em;
    opacity: 0;
    background-color: #4e4e4e;
    transition: .28s ease-in-out;
  }

  .views_text {
    font-family: Montserrat;
    font-size: 0.8em;
    margin-left: 0.25em;
    color: white;
  }

  .views_svg {
    width: 12px;
    height: 12px;
    fill: white;
  }

  .views:hover {
    background-color: #5A5F73;
    cursor: pointer;
  }

  .main:hover .likes {
    margin-top: 0.5em;
    opacity: 1;
  }

  .main:hover .comments {
    margin-top: 0.5em;
    opacity: 1;
  }

  .main:hover .views {
    margin-top: 0.5em;
    opacity: 1;
  }



  /* The Main Switch */

  .card_content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* The switch - the box around the slider */
  .switch_738 {
    font-size: 13px;
    position: relative;
    display: inline-block;
    width: 1.2em;
    height: 3.3em;
  }

  /* Hide default HTML checkbox */
  .switch_738 .chk_738 {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider_738 {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 5px;
  }

  .slider_738:before {
    position: absolute;
    content: "";
    height: .5em;
    width: 2.4em;
    border-radius: 5px;
    left: -0.6em;
    top: 0.2em;
    background-color: white;
    box-shadow: 0 6px 7px rgba(0, 0, 0, 0.3);
    transition: .4s;
  }

  .slider_738:before,
  .slider_738:after {
    content: "";
    display: block;
  }

  .slider_738:after {
    background: linear-gradient(transparent 50%, rgba(255, 255, 255, 0.15) 0) 0 50% / 50% 100%,
      repeating-linear-gradient(90deg, rgb(255, 255, 255) 0, rgb(255, 255, 255), rgb(255, 255, 255) 20%, rgb(255, 255, 255) 20%, rgb(255, 255, 255) 40%) 0 50% / 50% 100%,
      radial-gradient(circle at 50% 50%, rgb(255, 255, 255) 25%, transparent 26%);
    background-repeat: no-repeat;
    border: 0.25em solid transparent;
    border-left: 0.4em solid #ffffff;
    border-right: 0 solid transparent;
    transition: border-left-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
    transform: translateX(-22.5%) rotate(90deg);
    transform-origin: 25% 50%;
    position: relative;
    top: 0.5em;
    left: 0.55em;
    width: 2em;
    height: 1em;
    box-sizing: border-box;
  }

  .chk_738:checked+.slider_738 {
    background-color: limegreen;
  }

  .chk_738:focus+.slider_738 {
    box-shadow: 0 0 1px limegreen;
  }

  .chk_738:checked+.slider_738:before {
    transform: translateY(2.3em);
  }

  .chk_738:checked+.slider_738:after {
    transform: rotateZ(90deg) rotateY(180deg) translateY(0.45em) translateX(-1.4em);
  }
}

/* CodePen Card */
/* CodePen Card */

/* .el-card ::v-deep .el-card__header {
  padding: 2px 10px;
  background-color: palegoldenrod;
} */
.footer {
  height: 50px;
  display: flex;
  justify-content: center;
}

button {
  width: 20px;
  margin: 0 2px;
  padding: 15px 25px;
  border: unset;
  border-radius: 15px;
  color: #ffffff;
  z-index: 1;
  background: rgba(109, 159, 254);
  position: relative;
  font-weight: 400;
  font-size: 13px;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  transition: all 250ms;
  overflow: hidden;
}

button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 15px;
  // background-color: #ff2d2d;
  z-index: -1;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
  transition: all 250ms
}

button:hover {
  color: #e8e8e8;
}

button:hover::before {
  width: 100%;
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
  color: #79bbff;
  //font-weight: bold;
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

.el-form-item__content {
  display: flex;
  justify-content: center;
}
</style>
