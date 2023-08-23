<template>
    <div>
        <el-button @click="jumpToChat">跳转到群聊</el-button>
    </div>
    <!-- <ChatBox/> -->
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const route = useRoute()
const store = useUserStore()

const id = 3
const activeName = 'chat'
const jumpToChat = () => {
    router.push({name:'detail',params:{id}})
    store.pages.tabName = 'chat'
}

</script>