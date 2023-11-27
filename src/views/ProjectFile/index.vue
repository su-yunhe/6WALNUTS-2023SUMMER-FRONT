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
        <el-button round @click="dialogFormVisible3=true">权限</el-button>
        <el-button round @click="modify()">编辑</el-button>
        <el-popover placement="bottom" trigger="click" width="180px">
          <template #reference>
            <el-button round type="primary" class="ml-2" @click="useqrcode()">分享</el-button>
          </template>
          <div style="text-align: center;">
            <canvas id="canvas"></canvas>
            <el-link :href="shareLink" target="_blank">阅读文章</el-link>
          </div>
        </el-popover>
      </div>
    </div>


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
              <div style="height: 30px; padding-left: 20px; padding-top: 5px;">
                <el-dropdown>
                  <span>
                    <el-icon>
                      <Plus />
                    </el-icon> 新建</span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="newFile()">新建文档</el-dropdown-item>
                      <el-dropdown-item @click="newFolderFormVisible = true">新建文件夹</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>

                </el-dropdown>


              </div>
              <el-tree :data="dataSource" node-key="id" default-expand-all :expand-on-click-node="false"
                @node-click="(data, node, item) => selectFile(data, node, item)">

              </el-tree>
              <!-- <el-tree :data="dataSource" node-key="id" default-expand-all :expand-on-click-node="false"
                 @node-click="(data, node, item) => selectFile(data, node, item)">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>
                    {{ data.label }}
                  </span>
                </span>
              </el-tree> -->
              <!-- <span class="icon"></span> -->
              <!-- <span>{{data.fileName}}</span>
              </el-tree> -->
            </div>
            <el-button class="fold-btn" icon="el-icon-arrow-left" @click="changeFold()">收<br />起</el-button>
          </div>
        </transition>
      </div>

      <!-- 主体内容 -->
      <div class="side-pane-main" :style="{ marginLeft }">
        <div class="side-pane-main-header" v-if="$slots.mainHeader">
          <slot name="mainHeader"></slot>
        </div>
        <!-- 文件修改弹框 -->
        <el-dialog v-model="dialogFormVisible3" title="修改文件权限">
          <el-form :model="form3">
            <el-form-item label="文件id">
              <el-input v-model="form3.fileId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户id">
              <el-input v-model="form3.userId" autocomplete="off" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="danger" @click="dialogFormVisible3 = false">删除</el-button>
              <el-button type="primary" @click="dialogFormVisible3 = false">
                新增
              </el-button>
            </span>
          </template>
        </el-dialog>
        <!-- 新建文件弹框 -->
        <el-dialog v-model="dialogFormVisible" title="新建文件">
          <el-form :model="form">
            <el-form-item label="文件名">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="文件位置">
              <el-select v-model="form.folders" placeholder="请选择文件位置~">
                <el-option label='根目录' value="0"></el-option>
                <el-option v-for="(item, index) in forders" :key="index" :label=item.folderName :value=item.folderId />
              </el-select>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="upload()">
                确定
              </el-button>
            </span>
          </template>
        </el-dialog>
        <!-- 主体内容区 -->
        <div class="side-pane-main-body">
          <div id="preview" />
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
          @click="changeFold()">展<br />开</el-button>
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
import QRCode from 'qrcode'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
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
    default: '25%'
  }
})
const modelFile = ref([])

const form = ref({
  "name": '',
  "folders": "0"
})
const form3 = ref({
  "fileId": '',
  "userId": ''
})

// 定义文件夹
const forders = ref([])

const marginLeft = computed(() => {
  return fold.value ? 0 : props.sideWidth
})
// 现在选中的文件
const nowFile = ref({})

// 文章分享链接
const shareLink = ref('111')

const dialogFormVisible3 = ref(false)

// 编写文档
const newFile = async () => {
  upload()
  // 先建空文件
};

// 获取文件夹
const getFolders = async () => {
  await httpInstance.post('/get_file_tree', {
    workId: route.params.projectId
  }).then(res => {
    // console.log(res)
    for (const key in res.root_folders) {
      forders.value.push(res.root_folders[key])
    }
  })
  console.log(forders.value)
}

const upload = async () => {
  // 需要判断是新增还是修改
  // 新增
  console.log(form.value.name)
  // 在根目录
  if (form.value.folders === "0") {
    await httpInstance.post('file_add', {
      fileName: form.value.name,
      fileInclude: '',
      groupId: 6,
      fileUrl: "http://localhost:8080/test", //TODO: 修改
      workId: route.params.projectId,
      isRoot: '1',
      folderId: '0'
    }).then(res => {
      // 提示用户成功上传了文件，用户可以选择继续修改或退出
      router.push({ path: `/writeArticle/${route.params.projectId}` });
    })
  }
  else {
    console.log(1)
    await httpInstance.post('file_add', {
      fileName: form.value.name,
      fileInclude: '',
      groupId: 6,
      fileUrl: "http://localhost:8080/test", //TODO: 修改
      workId: route.params.projectId,
      isRoot: '0',
      folderId: form.value.folders,
    }).then(res => {
      router.push({ path: `/writeArticle/${route.params.projectId}` });
    })
  }
}


const changeFold = () => {
  fold.value = !fold.value
}
onMounted(async () => {

  // 获取项目文档
  // getModelFile()
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
  })
  await httpInstance.post('/get_file_tree', {
    workId: route.params.projectId
  }).then(res => {
    console.log(res)
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
    }
    // 根目录文件
    for (const key in res.root_files) {
      console.log(res.root_files[key].fileName)
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
    // 初始化渲染模板并置标题
    renderMarkdown(modelFile.value[0].fileInclude)
  })
  // getFolders()
  await httpInstance.post('/get_file_tree', {
    workId: route.params.projectId
  }).then(res => {
    // console.log(res)
    forders.value = []
    for (const key in res.root_folders) {
      forders.value.push(res.root_folders[key])
    }
  })
  console.log(forders.value)
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
  // dataSource.value[0].children[0].children = []
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
    }
    // 初始化渲染模板并置标题
    renderMarkdown(modelFile.value[0].fileInclude)

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
  })
      // getFileTree()
      // dataSource.value[0].children[0].children = []
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
    }
    // 初始化渲染模板并置标题
    renderMarkdown(modelFile.value[0].fileInclude)

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
  })
  // getFileTree()
  // dataSource.value[0].children[0].children = []
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
  })
  await httpInstance.post('/get_file_tree', {
    workId: route.params.projectId
  }).then(res => {
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
    }
    // 根目录文件
    for (const key in res.root_files) {
      console.log(res.root_files[key].fileName)
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
    // 初始化渲染模板并置标题
    renderMarkdown(modelFile.value[0].fileInclude)
  })
  // getFolders()
  await httpInstance.post('/get_file_tree', {
    workId: route.params.projectId
  }).then(res => {
    // console.log(res)
    forders.value = []
    for (const key in res.root_folders) {
      forders.value.push(res.root_folders[key])
    }
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
      shareLink.value = "http://localhost:8080/article/" + data.fileId
    }
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
  console.log(userStore.userInfo.userid)
  await httpInstance.post('/reference_check', {
    fileId: nowFile.value.fileId,
    user_now_id: userStore.userInfo.userid
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

// 分享
const useqrcode = () => {
  var canvas = document.getElementById('canvas')
  QRCode.toCanvas(canvas, shareLink.value, error => {
    if (error) console.error(error)
    console.log('二维码生成成功!');
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
  margin: 30px 30px;
  // border-top: 1px solid #d7dae2;
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
    height: 600px;
    top: 0;
    left: 0;
    border: 2px solid #cccfd7;
    // padding: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 20px;
    // font-size: 20px;
    transition: width 0.3s;
    background-color: #f4f4f4;

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
        height: 200px;
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
      height: 200px;
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

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
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