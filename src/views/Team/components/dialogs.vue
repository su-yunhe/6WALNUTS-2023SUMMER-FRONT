<template>
  <div>
    <el-dialog v-model="showAddMemberDialog" title="添加成员" width="30%">
      <span>
        <el-input v-model="addUsername" placeholder="输入用户名" />
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitMember"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showAddAdminDialog" title="添加管理员" width="30%">
      <span>
        <!-- <el-input v-model="addAdminname" placeholder="输入用户名" /> -->
        <el-select v-model="addAdminname" placeholder="选择用户">
          <el-option
            v-for="member in filteredMembers"
            :label="member.userName"
            :key="member.userName"
            :value="member.userName"
          ></el-option>
        </el-select>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitAdmin"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'
import httpInstance from '@/utils/http'
import { toRaw } from '@vue/reactivity'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const userId = userStore.userInfo.data.userid
const route = useRoute()
const teamId = userStore.pages.teamId

const addUsername = ref('')
const showAddMemberDialog = ref(false)
const addMember = () => {
  showAddMemberDialog.value = true
}
const submitMember = () => {
  httpInstance
    .post('/addUser', {
      adminid: userId,
      groupid: teamId,
      username: addUsername.value,
    })
    .then((res) => {
      console.log(res.data)
      userStore.pages.memberlist.length = 0
      userStore.loadMember()
      addUsername.value = ''
      ElMessage({
        message: '添加成员成功！',
        type: 'success',
      })
    })
  showAddMemberDialog.value = false
}

const memberList = userStore.pages.memberlist
const ml = toRaw(memberList)
const addAdminname = ref('')
const showAddAdminDialog = ref(false)
const addAdmin = () => {
  showAddAdminDialog.value = true
  console.log(ml)
}
//计算属性过滤创建者和管理员
const filteredMembers = computed(() => {
  return ml.filter((member) => member.userType == 3)
})
const submitAdmin = () => {
  httpInstance
    .post('/addAdmin', {
      adminid: userId,
      username: addAdminname.value,
      groupid: teamId,
    })
    .then((res) => {
      console.log(res.data)
      userStore.pages.memberlist.length = 0
      userStore.loadMember()
      addAdminname.value = ''
      ElMessage({
        message: '添加管理员成功！',
        type: 'success',
      })
    })
  showAddAdminDialog.value = false
}

defineExpose({
  showAddMemberDialog,
  addMember,
  showAddAdminDialog,
  addAdmin,
})
</script>
