<template>
    <aside>
    <div class="teamNavigator">
        <el-radio-group class="radio" v-model="isCollapse" style="margin-bottom: 20px" size="small">
            <el-radio-button :label="true"><el-icon><Fold /></el-icon></el-radio-button>
            <el-radio-button :label="false"><el-icon><Expand /></el-icon></el-radio-button>
        </el-radio-group>
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" router>
            <el-menu-item index="/team/detail/member">
            <el-icon><User /></el-icon>
            <template #title>成员</template>
            </el-menu-item>
            <el-menu-item index="2">
            <el-icon><Memo /></el-icon>
            <template #title>公告</template>
            </el-menu-item>
            <el-menu-item index="/team/detail/project">
            <el-icon><Suitcase /></el-icon>
            <template #title>项目</template>
            </el-menu-item>
            <el-menu-item index="4">
            <el-icon><ChatDotSquare /></el-icon>
            <template #title>聊天</template>
            </el-menu-item>
        </el-menu>
    </div>
    </aside>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100px;
  min-height: 400px;
}

.teamNavigator{
    margin-top: 20px;
    margin-left: 20px;
}

.radio{
    margin-left: 28px;
}
</style>