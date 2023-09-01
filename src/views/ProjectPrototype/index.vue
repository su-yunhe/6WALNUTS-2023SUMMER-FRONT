<template>
  项目文档
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { onMounted, ref } from 'vue'
const route = useRoute()
const router = useRouter()
onMounted(() => {
  console.log(1)
  console.log(route.params.projectId)
})
</script>