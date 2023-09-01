<template>
  <!-- @ 弹框 -->
  <el-popover :visible="visible" placement="right-end" title="选择团队成员" :width="200" offsite="100px" content="选择小组成员">
    <template #reference>
      <div class="ce"></div>
    </template>

    <el-table :data="member" stripe @row-click="selectMember">
      <el-table-column width="150" property="userRealName" label="名字" />
    </el-table>
  </el-popover>
  <div class="container">
    <el-container>
      <el-main>
        <div class="mainHeader">
          <el-page-header :icon="null">
            <template #content>
              <div class="flex items-center">
                <!-- <el-avatar :size="60" class="mr-3"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /> -->
                <span v-if="isTitle">
                  <el-input v-model="title"></el-input>
                </span>
                <span v-else class="text-large font-600 mr-1"> {{ article.fileName }} </span>
              </div>
            </template>
            <!-- 右侧按钮 -->
            <template #extra>
              <div class="flex items-center">
                <el-button v-if="isTitle" round type="success" @click="finishRename()">完成</el-button>
                <el-button v-else round @click="rename()">重命名</el-button>
                <el-button v-if="route.params.id" round @click="getfileVersion()">版本回退</el-button>
                <el-button round type="primary" class="ml-2" @click="check()">保存</el-button>
              </div>
            </template>
          </el-page-header>
        </div>
      </el-main>
    </el-container>
    <!-- 保存文件弹框 -->
    <el-dialog v-model="dialogFormVisible" title="保存文件">
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
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="upload()">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 版本回退侧边栏 -->
    <el-drawer v-model="drawerVisible">
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">版本回退</h4>
        <!-- <el-button type="danger" @click="close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled />
          </el-icon>
          Close
        </el-button> -->
      </template>
      <el-table :data="fileVersion" @row-click="chooseVersion">
        <el-table-column property="fileName" label="文档名" width="150" />
        <el-table-column property="fileVersion" label="文档版本" width="200" />
      </el-table>
    </el-drawer>
    <div id="vditor" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { ElMessageBox, valueEquals, ElMessage } from 'element-plus'
// import router from '@/router/index'
import httpInstance from '@/utils/http'
import { useRoute, useRouter } from "vue-router"
import { ElButton, ElDrawer } from 'element-plus'
import { SuccessFilled, CircleCloseFilled } from '@element-plus/icons-vue'
import VueNativeSock from 'vue-native-websocket'

const vditor = ref<Vditor | null>(null)
const webSocket = ref<WebSocket | null>(null)
const visible = ref(false)
// 定义成员列表
const member = ref([])
const router = useRouter()
const route = useRoute()
const drawerVisible = ref(false)
// 定义文章
const article = ref({
  "fileId": 0,
  "fileName": "",
  "fileInclude": "",
  "fileUrl": "",
  "fileIs_id": 0
})
// 定义文件夹
const forders = ref([])

// 定义文章标题
const title = ref('')
// 定义改名控制变量
const isTitle = ref(false)
const dialogFormVisible = ref(false)
const form = ref({
  "name": '',
  "folders": "0"
})
// 定义文章历史版本
const fileVersion = ref([])

onMounted(() => {
  if (route.params.id) { // 编辑
    getArticle()
  } else { // 新建
    setVditer()
  }

  // 添加键盘监听事件
  keyCodeForEvent()

  // 获取团队列表
  getMember()

  isTitle.value = false

  // 获取文件夹
  getFolders()

  // console.log(route.params.id)

  // 初始化 websocket 连接
  initWebSocket()
})

onBeforeUnmount(() =>  {
if (webSocket.value) {
  webSocket.value.close()
}
})

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

// 获取文件历史版本
const getfileVersion = async () => {
  await httpInstance.post('/get_file_all_version', {
    fileId: route.params.id
  }).then(res => {
    console.log(res)
    fileVersion.value = res.results
    console.log(fileVersion.value)
    drawerVisible.value = true

  })
}

// 选择文章历史版本
const chooseVersion = async (row) => {
  // console.log(row)
  ElMessageBox.confirm(
    '确定将文档回退到该版本吗?',
    '请确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 进行版本回退
    versionBack(row.fileId, row.fileVersion)
  })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete 已取消',
      })
    })
}

// 进行版本回退
const versionBack = async (fileId, fileVersion) => {
  console.log(fileId, fileVersion)
  await httpInstance.post('/file_version_back', {
    fileId: fileId,
    fileVersion: fileVersion
  }).then(res => {
    ElMessage({
      message: '版本回退成功',
      type: 'success',
    })
    drawerVisible.value = false
  })
  // 重新获取版本内容
  await httpInstance.post('/get_single_file', { fileId: route.params.id }).then(res => {
    article.value = res.results[0]
    vditor.value.setValue(article.value.fileInclude)
  })
}

// 获取文章内容，并注册富文本编辑器(编辑文章时调用)
const getArticle = async () => {
  await httpInstance.post('/get_single_file', { fileId: route.params.id }).then(res => {
    article.value = res.results[0]
    console.log(article.value)
    vditor.value = new Vditor('vditor', {
      "height": "600px",
      "cache": {
        "enable": false
      },
      "value": article.value.fileInclude,
      "mode": "ir",
      "toolbarConfig": {
        "pin": true
      },
      "counter": {
        "enable": true
      },
      "upload": {
        "url": "http://8.130.137.197/home/static/pics"
      },
      "outline": {
        "enable": true,
        "position": "left"
      }, 
      input (md) {
        // console.log("输入内容："+ md)
        sendcontent(md)
      }
    })
    title.value = article.value.fileName
  })
}

// 注册富文本编辑器(新建文章时调用)
const setVditer = () => {
  vditor.value = new Vditor('vditor', {
    "height": "600px",
    "cache": {
      "enable": false
    },
    "value": '',
    "mode": "ir",
    "toolbarConfig": {
      "pin": true
    },
    "counter": {
      "enable": true
    },
    "upload": {
      "url": "http://8.130.137.197/home/static/pics"
    },
    "outline": {
      "enable": true,
      "position": "left"
    },
    input (md) {
        // console.log("输入内容："+ md)
        sendcontent(md)
      }
  })
}

// 保存时检查是新增还是修改
const check = async () => {
  if (route.params.id) { // 修改
    await httpInstance.post('/file_modify_include', {
      fileId: route.params.id,
      fileInclude: vditor.value.getValue()
    }).then(res => {
      // 提示用户成功上传了文件，用户可以选择继续修改或退出
      ElMessageBox.confirm(
        '您已经成功保存文档~ 是否退出?',
        '保存成功',
        {
          confirmButtonText: '退出',
          cancelButtonText: '继续编辑',
          type: 'success',
        }
      )
        .then(() => {
          // router.push({ path: `/article/${route.params.id}` })
          router.back()
        })
        .catch(() => {
        })
    })
  } else {
    dialogFormVisible.value = true
  }
}

// 上传文档
const upload = async () => {
  // 需要判断是新增还是修改
  // 新增
  console.log(form.value.name)
  // 在根目录
  if (form.value.folders === "0") {

    await httpInstance.post('file_add', {
      fileName: form.value.name,
      fileInclude: vditor.value.getValue(),
      groupId: 6,
      fileUrl: "http://localhost:8080/test", //TODO: 修改
      workId: route.params.projectId,
      isRoot: '1',
      folderId: '0'
    }).then(res => {
      // 提示用户成功上传了文件，用户可以选择继续修改或退出
      ElMessageBox.confirm(
        '您已经成功保存文档~ 是否退出?',
        '保存成功',
        {
          confirmButtonText: '退出',
          cancelButtonText: '继续编辑',
          type: 'success',
        }
      )
        .then(() => {
          router.back()
        })
        .catch(() => {
        })
    })
  }
  else {
    console.log(1)
    await httpInstance.post('file_add', {
      fileName: form.value.name,
      fileInclude: vditor.value.getValue(),
      groupId: 6,
      fileUrl: "http://localhost:8080/test", //TODO: 修改
      workId: route.params.projectId,
      isRoot: '0',
      folderId: form.value.folders,
    }).then(res => {
      // 提示用户成功上传了文件，用户可以选择继续修改或退出
      ElMessageBox.confirm(
        '您已经成功保存文档~ 是否退出?',
        '保存成功',
        {
          confirmButtonText: '退出',
          cancelButtonText: '继续编辑',
          type: 'success',
        }
      )
        .then(() => {
          router.back()
        })
        .catch(() => {
        })
    })
  }


}

// 监听键盘事件
// 模拟组合键触发函数
const keyCodeForEvent = () => {
  let code = 0
  let code2 = 0
  document.addEventListener("keydown", function (e) {
    if (e.code === 'ShiftLeft') {
      code = 1
    }
    if (e.code === 'Digit2') {
      code2 = 1
    }
    if (code === 1 && code2 === 1) {
      // console.log('@')
      visible.value = true
      // 输入@弹出
      code = 0
      code2 = 0
    }
  })
  document.addEventListener("keyup", function (e) {
    // console.log(e.code)
    if (e.code === 'ShiftLeft') {
      code = 0
    }
    if (e.code === 'Digit2') {
      code2 = 0
    }
    if (e.code === 'Escape' || e.code === 'Backspace') {
      visible.value = false
    }
  })
}

// 获取团队列表
const getMember = async () => {
  await httpInstance.post('/manage/getGroupInf',).then(res => {
    // console.log(res)
    member.value = res.data
    console.log(member.value)
  })
}

// 取消选择
const quxiao = () => {
  visible.value = false
}

// 选择成员
const selectMember = (row) => {
  console.log(row)
  ElMessage({
    showClose: true,
    type: "success",
    message: '成功发送了消息！！',
  })
  visible.value = false
  vditor.value.setValue(vditor.value.getValue().trim() + row.userRealName.trim())
  const textarea = document.querySelector('textarea');
  const pos = textarea.selectionStart + 4;
  textarea.setSelectionRange(pos, pos);
}

// 文档重命名
const rename = () => {
  isTitle.value = true
}

// 完成重命名
const finishRename = () => {
  isTitle.value = false
}

// 检测输入变化
const checkInput = () => {
  console.log(111)
}

// 初始化websocket
const initWebSocket = () => {
  const wsuri = "ws://124.222.224.186:8800"
  webSocket.value = new WebSocket(wsuri)
  webSocket.value.onmessage = webSocketonmessage
  webSocket.value.onopen = websocketonopen
  webSocket.value.onerror = websocketonerror
  webSocket.value.onclose = websocketonclose
}

// 数据接收
const webSocketonmessage = (e) => {
  const jsondata = e
  console.log(jsondata)
}

//连接建立之后执行 send 方法发送数据
const websocketonopen = () => { 
  console.log('连接成功！')
}

// 建立连接失败则不断重连
const websocketonerror = () => {
  initWebSocket()
}

// 断开连接
const websocketonclose = () => {
  console.log('断开连接')
}

// 发送消息
const sendcontent = (value) => {
  webSocket.value.send(value)
}



</script>

<style scoped>
.ce {
  position: absolute;
  top: 200px;
}
</style>