<template>
  <div type="container">
    <button type="primary" @click="handleStart">开始</button>
    <div id="aa">522</div>
    <img id="bb" src="../../assets/images/logo.png" />
    <div id="cc">6549459</div>
  </div>
  <el-form :model="newProject" label-width="120px">
      <el-form-item label="项目名称">
        <el-input v-model="newProject.workname" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">预览</el-button>
        <el-button>取消</el-button>
        <el-link :href="url" target="_blank">default</el-link>
      </el-form-item>
    </el-form>
</template>
<script setup>
// import intro from "intro.js";
import "intro.js/minified/introjs.min.css";
import { inject,ref } from 'vue'
import httpInstance from '@/utils/http'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const test = inject('$test')
const newProject = ref({
  protoName: 'job1',
  workIs: 'job1',
  protoInclude: 'http://localhost:8080/public/demo/narrow-jumbotron/index.html'
})
const onSubmit = async () => {
  await httpInstance.post('/page_add', {
    protoName: 'job1',
    workIs: '5',
    protoInclude: 'http://localhost:8080/public/demo/narrow-jumbotron/index.html'
  }).then(res => {
    console.log(res)
    // router.push({ path: '/project' })
  })
}

const url = ref('')
const getList = async () => {
  await httpInstance.post('/page_get', {
    workId: '5',
  }).then(res => {
    console.log(res.results)
    url.value = res.results[0].protoInclude
    // router.push({ path: '/project' })
  })
}
</script>

