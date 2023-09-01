<template>
<div>1</div>
</template>
<script setup>
// import intro from "intro.js";
// import "intro.js/minified/introjs.min.css";
import { inject,ref, onMounted } from 'vue'
import httpInstance from '@/utils/http'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const test = inject('$test')
onMounted(() => {
  onSubmit()
});
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
    window.location.href="http://localhost:8080/public/editor.html"
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

