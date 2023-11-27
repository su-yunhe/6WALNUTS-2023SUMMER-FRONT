<template>
  <div>
    <el-dialog v-model="showAddMemberDialog" title="邀请成员" width="30%">
      <span>
        <el-input v-model="addUsername" placeholder="请输入邀请成员用户名" />
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitMember"> 邀请 </el-button>
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
const userId = userStore.userInfo.userid
const route = useRoute()
const teamId = userStore.pages.teamId

const addUsername = ref('')
const showAddMemberDialog = ref(false)
const addMember = () => {
  showAddMemberDialog.value = true
}

const send = () => {
  httpInstance.post('/invite',{
    type:'sendMessage',
    csrfmiddlewaretoken:'{{ csrf_token }}',
    email:'daemonafrono@gmail.com'
  }).then(res => {
    console.log(res)
  })
}

const submitMember = () => {
  httpInstance
    .post('/addUser', {
      adminid: userId,
      groupid: teamId,
      Username: addUsername.value,
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
const ml = ref()
const addAdminname = ref('')
const showAddAdminDialog = ref(false)
const addAdmin = () => {
  showAddAdminDialog.value = true
}
//计算属性过滤创建者和管理员
const filteredMembers = computed(() => {
  ml.value = toRaw(memberList)
  return ml.value.filter((member) => member.userType == 3)
})
const submitAdmin = () => {
  console.log("admin:"+addAdminname.value)
  httpInstance
    .post('/addAdmin', {
      adminid: userId,
      Username: addAdminname.value,
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
