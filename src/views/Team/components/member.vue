<template>
  <Main>
    <div>
      <el-table
        :data="userStore.pages.memberlist"
        :default-sort="{ prop: 'userType', order: 'ascending' }"
        style="width: 100%"
        size="large"
        :row-class-name="tableRowClassName"
        @row-click="memberInfo"
      >
        <el-table-column type="expand">
          <template #default="scope"> </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.userName }}</span>
              <el-tag
                v-if="scope.row.userName == userName"
                class="ml-2"
                type="success"
                style="margin-left: 10px"
                >我</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="userRealName" label="姓名" width="180" />
        <el-table-column prop="userType" label="身份" width="150">
          <template #default="{ row }">
            <el-tag
              v-if="row.userType == 1"
              class="ml-2"
              type="warning"
              effect="plain"
              >创建者</el-tag
            >
            <el-tag
              v-if="row.userType == 2"
              class="ml-2"
              type="primary"
              effect="plain"
              >管理员</el-tag
            >
            <el-tag
              v-if="row.userType == 3"
              class="ml-2"
              type="info"
              effect="plain"
              >成员</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="userEmail" label="邮箱" width="220" />
        <el-table-column prop="operation" label="操作" width="150">
          <template #default="{ row }">
            <el-popconfirm
              title="确定要撤销成员的管理员身份吗?"
              @confirm="cancelAdmin(row.userName)"
              hide-after="50"
            >
              <template #reference>
                <el-button
                  :disabled="myType != 1"
                  v-if="row.userType == 2"
                  type="warning"
                  plain
                  round
                  >撤销管理</el-button
                >
              </template>
            </el-popconfirm>
            <el-popconfirm
              title="确定要将成员从团队移除吗？"
              @confirm="removeMember(row.userName)"
              hide-after="50"
            >
              <template #reference>
                <el-button
                  :disabled="myType == 3"
                  v-if="row.userType == 3"
                  type="danger"
                  plain
                  round
                  >移除成员</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </Main>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import axios from 'axios'
import httpInstance from '@/utils/http'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import router from '@/router'

const userStore = useUserStore()
const userId = userStore.userInfo.data.userid
const userName = userStore.userInfo.data.username

const myType = ref()
const team_id = userStore.pages.teamId
const getType = () => {
  httpInstance
    .post('/getType', {
      userid: userId,
      groupid: team_id,
    })
    .then((res) => {
      myType.value = res.data.userType
    })
}

const memberInfo = (row) => {
  userStore.pages.visitMemberUsername = row.userName
  router.push({ name: 'userInfo' })
}

const tableRowClassName = ({ row, rowIndex }) => {
  if (row.userType == 1) {
    return 'warning-row'
  } else if (row.userType == 2) {
    return 'primary-row'
  }
  return ''
}

const cancelAdmin = (userName) => {
  console.log(userName)
  httpInstance
    .post('/cancelAdmin', {
      adminid: userId,
      groupid: userStore.pages.teamId,
      username: userName,
    })
    .then((res) => {
      console.log(res)
      userStore.pages.memberlist.length = 0
      userStore.loadMember()
      ElMessage({
        message: '撤销管理员成功！',
        type: 'success',
      })
    })
}

const removeMember = (userName) => {
  httpInstance
    .post('/deleteUser', {
      adminid: userId,
      groupid: userStore.pages.teamId,
      username: userName,
    })
    .then((res) => {
      console.log(res)
      userStore.pages.memberlist.length = 0
      userStore.loadMember()
      ElMessage({
        message: '移除成员成功！',
        type: 'success',
      })
    })
}

onBeforeMount(() => {
  userStore.pages.memberlist.length = 0
  userStore.loadMember()
  getType()
})
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.el-table .primary-row {
  --el-table-tr-bg-color: var(--el-color-primary-light-9);
}
</style>
