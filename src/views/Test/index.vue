<template>
  <el-popover :visible="visible" placement="right-end" title="选择团队成员" :width="200" offsite="100px" content="选择小组成员">
    <template #reference>
      <div class="ce"></div>
    </template>
    <el-button @click="quxiao()">取消</el-button>
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
                <span class="text-large font-600 mr-1"> 新建文档 </span>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router/index'
import httpInstance from '@/utils/http'
const vditor = ref<Vditor | null>(null)
const visible = ref(false)



onMounted(() => {
  // 注册富文本编辑器
  vditor.value = new Vditor('vditor', {
    "height": 1000,
    "cache": {
      "enable": false
    },
    "value": "## 即时渲染（IR）\n即时渲染模式对熟悉 Typora 的用户应该不会感到陌生，理论上这是最优雅的 Markdown 编辑方式。",
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
  // 添加键盘监听事件
  keyCodeForEvent()
  // 获取团队列表
  getMember()

})


// 上传文档

const upload = async () => {
  console.log(vditor.value.getValue())
  await httpInstance.post('file_add', {
    filename: "xfy",
    fileinclude: vditor.value.getValue(),
    groupid: 1,
    fileurl: "http://localhost:8080/test",
    workid: 7
  }).then(res => {
    console.log(res)
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
      router.push({ path: '/test' })
    })
    .catch(() => {
    })
  })
}

// 监听键盘事件
// 模拟组合键触发函数
const keyCodeForEvent = () => {
  let code = 0;
  let code2 = 0;
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
    // console.log(e.code)
    if (e.code === 'ShiftLeft') {
      code = 0
    }
    if (e.code === 'Digit2') {
      code2 = 0
    }
    if (e.code === 'Escape') {
      visible.value = false
    }
  })
}

// 定义成员列表
const member = ref([])

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
  console.log("成功发送了消息！！！！")
  visible.value = false
  myInput()
}

// 模拟键盘输入
const myInput = () => {
  var dom = document.querySelector('#selector')
  var evt = new InputEvent('input', {
    inputType: 'insertText',
    dataTransfer: null,
    isComposing: false
  });
  dom.value = '输入的内容'
  dom.dispatchEvent(evt)
}
</script>

<style scoped>
.ce {
  position: absolute;
  top: 200px;
}
</style>