<template>
    <div>
        <el-dialog v-model="showAddMemberDialog" title="添加成员" width="30%">
            <span>
                <el-input v-model="addUsername" placeholder="输入用户名" />
            </span>
            <template #footer>
                <span class="dialog-footer">
                <el-button type="primary" @click="submitMember">
                    提交
                </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="showAddAdminDialog" title="添加管理员" width="30%">
            <span>
                <el-input v-model="addAdminname" placeholder="输入用户名" />
            </span>
            <template #footer>
                <span class="dialog-footer">
                <el-button type="primary" @click="submitAdmin">
                    提交
                </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const userId = ref<String>(userStore.userInfo.userid) 
const route = useRoute()
const teamId = route.params.id

const addUsername = ref('')
const showAddMemberDialog = ref(false)
const addMember = () => {
    showAddMemberDialog.value = true
    
}
const submitMember = () => {
    showAddMemberDialog.value = false
}

const addAdminname = ref('')
const showAddAdminDialog = ref(false)
const addAdmin = () => {
    showAddAdminDialog.value = true
    console.log("aaa")
}
const submitAdmin = () => {
    showAddAdminDialog.value = false
}


defineExpose({
    showAddMemberDialog,
    addMember,
    showAddAdminDialog,
    addAdmin,
})
</script>
