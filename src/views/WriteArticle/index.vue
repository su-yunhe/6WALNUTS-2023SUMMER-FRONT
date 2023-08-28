<template>
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
                <el-avatar :size="60" class="mr-3"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <span class="text-large font-600 mr-1"> {{ article.fileName }} </span>
              </div>
            </template>
            <!-- 右侧按钮 -->
            <template #extra>
              <div class="flex items-center">
                <el-button>暂存</el-button>
                <el-button type="primary" class="ml-2" @click="upload()">保存</el-button>
              </div>
            </template>
          </el-page-header>
        </div>
      </el-main>
    </el-container>
    <div id="vditor" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { ElMessageBox, valueEquals, ElMessage } from 'element-plus'
// import router from '@/router/index'
import httpInstance from '@/utils/http'
import { useRoute, useRouter } from "vue-router"
import { SuccessFilled } from '@element-plus/icons-vue/dist/types';

const vditor = ref<Vditor | null>(null)
const visible = ref(false)
// 定义成员列表
const member = ref([])
const router = useRouter()
const route = useRoute()

// 定义文章
const article = ref({})

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
})

// 获取文章内容，并注册富文本编辑器
const getArticle = async () => {
  await httpInstance.post('/get_single_file', route.params.id).then(res => {
    article.value = res.results[0]
    console.log(article.value)
    vditor.value = new Vditor('vditor', {
      // "height": "80%",
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
      }
    })
  })
}

// 注册富文本编辑器
const setVditer = () => {
  vditor.value = new Vditor('vditor', {
    "height": 1000,
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
    }
  })
}

// 上传文档
const upload = async () => {
  // 需要判断是新增还是修改
  if (route.params.id) { // 修改
    await httpInstance.post('/file_modify_include', {
      fileid: route.params.id,
      fileinclude: vditor.value.getValue()
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
          router.push({ path: `/article/${route.params.id}` })
        })
        .catch(() => {
        })
    })
  } else { // 新增
    await httpInstance.post('file_add', {
      filename: "xfy",
      fileinclude: vditor.value.getValue(),
      groupid: 1,
      fileurl: "http://localhost:8080/test", //TODO: 修改
      workid: 7
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
          router.push({ path: `/article/${route.params.id}` })
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
      console.log('@')
      visible.value = true
      // 输入@弹出
      code = 0
      code2 = 0
    }
  })
  document.addEventListener("keyup", function (e) {
    console.log(e.code)
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
  // console.log("成功发送了消息！！！！")
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

// 模拟键盘输入
// const myInput = () => {
//   var dom = document.querySelector('#selector')
//   var evt = new InputEvent('input', {
//     inputType: 'insertText',
//     dataTransfer: null,
//     isComposing: false
//   });
//   dom.value = '输入的内容'
//   dom.dispatchEvent(evt)
// }
</script>

<style scoped>
.ce {
  position: absolute;
  top: 200px;
}
</style>