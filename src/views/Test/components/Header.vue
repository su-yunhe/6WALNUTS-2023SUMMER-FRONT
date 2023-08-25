<template>
  <div class="blank"></div>
  <div class="container">
    <div aria-label="A complete example of page header">
      <el-page-header @back="onBack">
        <template #breadcrumb>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: './page-header.html' }">
              项目文档
            </el-breadcrumb-item>
            <el-breadcrumb-item><a href="./page-header.html">富文本文档</a></el-breadcrumb-item>
          </el-breadcrumb>
        </template>
        <template #content>
          <div class="flex items-center">
            <el-avatar class="mr-3" :size="32"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <span class="text-large font-600 mr-3"> 这是一个测试文档 </span>
            <el-tag>未保存</el-tag>
          </div>
        </template>
        <template #extra>
          <div class="flex items-center">
            <el-button>打印</el-button>
            <el-button type="primary" class="ml-2">保存修改</el-button>
          </div>
        </template>
      </el-page-header>
    </div>
  </div>
  <div class="blank"></div>
  <div class="blank"></div>
  <div class="blank"></div>
  <div class="blank"></div>
</template>

<script setup lang="ts">
import { ElNotification as notify } from 'element-plus'

const onBack = () => {
  notify('Back')
}
</script>

<style scoped lang="scss">
.blank {
  margin: 20px auto
}
</style>