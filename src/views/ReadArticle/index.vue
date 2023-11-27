<template>
  <!-- 文章阅读 -->
  <div class="container">
    <div class=""></div>


    <el-container>
      <el-main>
        <div class="mainHeader">
          <el-page-header :icon="null">
            <template #content>
              <div class="flex items-center">
                <!-- <el-avatar :size="60" class="mr-3"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /> -->
                <span class="text-large font-600 mr-1"> {{ article.fileName }} </span>
              </div>
            </template>
            <!-- 右侧按钮 -->
            <template #extra>
              <div class="flex items-center">
                <el-button @click="modify()">编辑</el-button>
              </div>
            </template>
          </el-page-header>
        </div>
      </el-main>
    </el-container>
    <!-- <div id="vditor" /> -->
    <div id="preview" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
// import router from '@/router/index'
import { useRoute, useRouter } from "vue-router"
import { loginAPI } from '@/apis/user';
import httpInstance from '@/utils/http'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import QRCode from 'qrcode'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const visible = ref(false)
const router = useRouter()
const route = useRoute()

onMounted(() => {
  // 获取文章列表
  // getArticle(route.params.id)
  getArticle()
})

// 定义文章
const article = ref({
  fileId: 0,
  fileInclude: "",
  fileIs_id: 0,
  fileName: "",
  fileUrl: "",
  folderIs: 0
})

// 初始化获取文章
const getArticle = async () => {
  await httpInstance.post('/get_single_file', {
    fileId: route.params.id
  }).then(res => {
    article.value = res.results[0]
    console.log(article.value)
    renderMarkdown(article.value.fileInclude)
  })
}

// 处理样式
const renderMarkdown = (md) => {
  Vditor.preview(document.getElementById("preview"), md, {
    hljs: { style: "github" },
  });
}

// 编辑
const modify = async () => {
  await httpInstance.post('/reference_check', {
    fileId: route.params.id,
    userNowId: userStore.userInfo.userid,
  }).then(res => {
    // console.log(res)
    if (res.error === 0) {
      router.push({ path: `/modifyArticle/${route.params.id}` })
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
const useqrcode = (txt) => {
  var canvas = document.getElementById('canvas')
  QRCode.toCanvas(canvas, txt, error => {
    if (error) console.error(error)
    console.log('二维码生成成功!');
  })
}

</script>


<style scoped>
.ce {
  position: absolute;
  top: 200px;
}
</style>