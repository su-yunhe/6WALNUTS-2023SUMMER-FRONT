<template>
  <div class="container">
    <div class="header">
      <div class="name">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span> 项目文档 </span>
      </div>
      <div class="search">
        <div class="box">
          <span>{{ nowFile.fileName }}</span>
        </div>
      </div>
      <div class="button">
        <el-button round @click="modify()">编辑</el-button>
        <el-button round type="primary" @click="newFolderFormVisible = true">重命名</el-button>
      </div>
    </div>
    <el-container>
      <el-main>
        <div class="mainHeader">
          <el-page-header :icon="null" @back="onBack()">
            <template #content>
              <div class="flex items-center">
                <!-- <el-avatar :size="60" class="mr-3"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /> -->
                <span class="text-large font-600 mr-1"> 我的项目 > {{ route.params.projectName }} > 项目文档 </span>
              </div>
            </template>
            <template #extra>

            </template>
          </el-page-header>
        </div>
      </el-main>
    </el-container>

    <div class="side-pane" :class="{ 'fold': fold }" :style="{ height }">

      <!-- 侧边内容 -->
      <div class="side-pane-left" :style="{ width: sideWidth }">
        <transition name="side-pane-left">
          <div class="side-pane-left-con" v-if="!fold">
            <div class="side-pane-left-header" v-if="$slots.leftHeader">
              <slot name="leftHeader"></slot>
            </div>

            <!-- 侧边主体内容区 -->
            <div class="side-pane-left-body">
              <!-- <slot name="left"></slot> -->
              <el-tree :data="dataSource" node-key="id" default-expand-all :expand-on-click-node="false"
                :render-content="renderContent" @node-click="(data, node, item) => selectFile(data, node, item)" />
              <!-- <span class="icon"></span> -->
              <!-- <span>{{data.fileName}}</span>
              </el-tree> -->
            </div>
            <el-button class="fold-btn" icon="el-icon-arrow-left" @click="changeFold()">111</el-button>
          </div>
        </transition>
      </div>

      <!-- 主体内容 -->
      <div class="side-pane-main" :style="{ marginLeft }">
        <div class="side-pane-main-header" v-if="$slots.mainHeader">
          <slot name="mainHeader"></slot>
        </div>

        <!-- 主体内容区 -->
        <div class="side-pane-main-body">
          <div id="preview" />
          <el-button @click="newFolderFormVisible = true">新建文件夹</el-button>
        </div>
        <el-dialog v-model="newFolderFormVisible" title="请输入文件夹名~">
          <el-form :model="folderForm">
            <el-form-item label="名称">
              <el-input v-model="folderForm.name" autocomplete="off" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="newFolderFormVisible = false">取消</el-button>
              <el-button type="primary" @click="newFolder()">
                新建
              </el-button>
            </span>
          </template>
        </el-dialog>
        <el-button v-if="fold" class="unfold-btn" type="text" icon="el-icon-arrow-right"
          @click="changeFold()"></el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router"
import { onMounted, ref, computed } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import httpInstance from '@/utils/http'
import type Node from 'element-plus/es/components/tree/src/model/node'
const route = useRoute()
const router = useRouter()
// 控制侧栏的显示与隐藏
const fold = ref(false)
const newFolderFormVisible = ref(false)
const folderForm = ref({
  name: ''
})
const projectFile = ref([])
const props = defineProps({
  height: {
    type: String,
    default: '100%'
  },
  sideWidth: {
    type: String,
    default: '15%'
  }
})
const modelFile = ref([])

const marginLeft = computed(() => {
  return fold.value ? 0 : props.sideWidth
})
// 现在选中的文件
const nowFile = ref({})



const changeFold = () => {
  fold.value = !fold.value
}
onMounted(() => {
  // 获取项目的文件树
  // getFileTree()
  // 获取项目文档
  getModelFile()
})
interface Tree {
  id: number,
  fileId: number,
  fileName: string,
  label: string,
  // icon: string
  children?: Tree[]
}
let id = 3 // 0: 根文件夹  1: 文件夹 2: 模板文件  其他: 项目文件

const dataSource = ref<Tree[]>([])
// 获取项目的文件树
const getFileTree = async () => {
  await httpInstance.post('/get_file_tree', {
    workId: route.params.projectId
  }).then(res => {
    for (const key in res.root_files) {
      const newChild = {
        id: id++,
        fileId: res.root_files[key].fileId,
        fileName: res.root_files[key].fileName,
        label: '文件 ' + res.root_files[key].fileName,
        // icon: '',
        children: []
      }
      if (!dataSource.value[0].children) {
        dataSource.value[0].children = []
      }
      dataSource.value[0].children.push(newChild)
      projectFile.value.push(res.root_files[key])
    }
    for (const key in res.son_files) {
      projectFile.value.push(res.son_files[key])
    }
    // 遍历文件夹
    for (const key in res.root_folders) {
      const folder = {
        id: 1,
        fileId: 0,
        // icon: '',
        fileName: '',
        label: '文件夹 ' + res.root_folders[key].folderName,
        children: []
      }
      for (const key2 in res.son_files) {
        if (res.son_files[key2].folderIs === res.root_folders[key].folderId) {
          const son = {
            id: id++,
            fileId: res.son_files[key2].fileId,
            // icon: '',
            fileName: res.son_files[key2].fileName,
            label: '文件 ' + res.son_files[key2].fileName,
            children: []
          }
          folder.children.push(son)
        }
      }
      dataSource.value[0].children.push(folder)
      // for (const key2 in res.son_files) {
      //   if (res.son_files[key2].folderIs == res.root_folders[fo_id].folderId) {
      //     const son = { id: id++, label: res.son_files[key2].fileName, children: [] }
      //     if (!dataSource.value[0].children[fo_id].children) {
      //       dataSource.value[0].children[fo_id].children = []
      //     }
      //     dataSource.value[0].children[fo_id].children.push(son)
      //   }


      // }
    }
    // 初始化渲染第一篇文章
    if (projectFile.value.length !== 0) {
      renderMarkdown(projectFile.value[0].fileInclude)
    }
  })
}


// 获取项目模板
const getModelFile = async () => {
  await httpInstance.post('/get_model_file').then(res => {
    modelFile.value = res.results
    dataSource.value = [{
      id: 0,
      fileId: 0,
      fileName: '',
      label: route.params.projectName,
      // icon: '',
      children: [
        {
          id: 1,
          fileId: 0,
          label: '文件夹 模板文档',
          fileName: '',
          children: [],
        }
      ]
    }]
    for (const key in modelFile.value) {
      const model = {
        id: 2,
        fileId: modelFile.value[key].fileId,
        fileName: modelFile.value[key].fileName,
        label: '模板文档 ' + modelFile.value[key].fileName,
        children: []
      }
      dataSource.value[0].children[0].children.push(model)
    }
    getFileTree()
  })
}

// 新建文件夹
const newFolder = async () => {
  await httpInstance.post('/add_folder', {
    folder_name: folderForm.value.name,
    workId: route.params.projectId
  }).then(res => {
    console.log(res)
    newFolderFormVisible.value = false
    getFileTree()
  })
}


// 初始化文章

// 点击切换文章
const selectFile = (data, node, item) => {
  // console.log(data.fileId)
  nowFile.value = data
  console.log(nowFile.value)
  if (data.fileId !== 0) {
    // 模板文档
    if (data.id === 2) {
      const model = modelFile.value.find(obj => obj.fileId === data.fileId)
      renderMarkdown(model.fileInclude)
    }
    else {
      const file = projectFile.value.find(obj => obj.fileId === data.fileId)
      renderMarkdown(file.fileInclude)
    }


    // console.log(projectFile.value.find(obj => obj.fileId === data.fileId))

  }
}

// 处理样式
const renderMarkdown = (md) => {
  Vditor.preview(document.getElementById("preview"), md, {
    hljs: { style: "github" },
  });
}

// 编辑
const modify = async () => {
  console.log(nowFile.value.fileId)
  await httpInstance.post('/reference_check', {
    fileId: nowFile.value.fileId,
    userNowId: 1
  }).then(res => {
    // console.log(res)
    if (res.error === 0) {
      router.push({ path: `/modifyArticle/${nowFile.value.fileId}` })
    } else {
      ElMessageBox.alert('This is a message', 'Title', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
        callback: (action: Action) => {
          ElMessage({
            type: 'info',
            message: `action: ${action}`,
          })
        },
      })
    }
  })
}
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  display: flex;

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

    // background-color: pink;
    .box {
      margin: 0 auto;
      padding-top: 40px;
      height: 50px;
      width: 80%;
      text-align: center;
      font-size: 20px;
      font-weight: bold;

      .xiala {
        font-size: 15px;
        font-weight: normal;
      }
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






.mainHeader {
  height: 50px;
  padding: 20px 30px;
  background-color: #ffffff;
}

.fileMain {
  margin: 10px 20px;
  height: 100px;
  background-color: pink;
}


/*  */
.side-pane {
  position: relative;
  min-height: 800px;
  border: 1px solid #d7dae2;
  // background-color: #ff9494;

  &.fold {
    .side-pane-left {
      width: 0;
      height: 0;
      border: none;
    }

    .side-pane-main {
      margin-left: 0;
    }

    &:hover {
      .unfold-btn {
        visibility: visible;
      }
    }
  }

  .side-pane-left {
    overflow: hidden;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    border-right: 1px solid #d7dae2;
    transition: width 0.3s;

    &:hover {
      .fold-btn {
        visibility: visible;
      }
    }

    &-con {
      .side-pane-left-header {
        overflow: hidden;
        box-sizing: border-box;
        min-height: 40px;
        padding: 8px 20px 8px 16px;
        border-bottom: 1px solid #d7dae2;
      }

      .fold-btn {
        visibility: hidden;
        position: absolute;
        width: 20px;
        height: 40px;
        top: 0;
        right: 0;
        color: #666;
        border-radius: 0;
        background-color: rgba($color: #000000, $alpha: 0.05);

        &:hover {
          background-color: rgba($color: #000000, $alpha: 0.15);
        }
      }
    }
  }

  .side-pane-main {
    position: relative;
    transition: all 0.3s;

    .side-pane-main-header {
      box-sizing: border-box;
      min-height: 40px;
      padding: 8px 20px;
      border-bottom: 1px solid #d7dae2;
    }

    .side-pane-main-body {
      padding: 8px 20px;
    }

    .unfold-btn {
      visibility: hidden;
      position: absolute;
      width: 20px;
      height: 40px;
      top: 0;
      left: 0;
      color: #666;
      border-radius: 0;
      background-color: rgba($color: #000000, $alpha: 0.05);

      &:hover {
        background-color: rgba($color: #000000, $alpha: 0.15);
      }
    }
  }
}

.side-pane-left-enter-active,
.side-pane-left-leave-active {
  transition: opacity 0.5s;
}

.side-pane-left-enter,
.side-pane-left-leave-to {
  opacity: 0;
}

// .icon::before {
//   /* background-color: aqua; */
//   content:'';
//   /* float: left; */
//   display: inline-block;
//   width: 15px;
//   height: 15px;
//   background: url('@/assets/imges/file.png') no-repeat;
//   background-size: 15px;
// }
</style>