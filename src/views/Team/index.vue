<template>
  <div>
    <div v-show="$route.meta.showFooter">
      <el-card class="box-card teamcard">
        <div class="card-header">
          <!-- <el-table :data="tableData" stripe style="width: 100%" @row-click="openTeam">
            <el-table-column prop="groupId" label="团队id" width="100" />
            <el-table-column prop="groupName" label="团队名称" width="180" />
            <el-table-column prop="groupBuilder" label="创建者" width="180" />
            <el-table-column prop="buildTime" label="创建时间" :formatter="dateFormat" width="240" />
            <el-table-column prop="occupation" label="我的身份" />
            </el-table> -->
        </div>
        <div
          v-for="item in tableData"
          :key="item"
          class="divteamCard"
          @click="openTeam(item.groupId)"
        >
          <div class="teamCard">
            <div class="teamDiscription">
              <div class="cardTitle">
                {{ item.groupName }}
              </div>
            </div>
            <div class="teamDiscription">
              <el-text>创建人</el-text>
              <el-divider direction="vertical" />
              <el-text size="large">{{ item.groupBuilder }}</el-text>
            </div>
            <div class="teamDiscription">
              <el-text>创建时间</el-text>
              <el-divider direction="vertical" />
              <el-text size="large">{{
                moment(item.buildTime).utcOffset(8).format('YYYY-MM-DD HH:mm')
              }}</el-text>
            </div>
          </div>
        </div>
        <div class="divteamCard teamCard-create">
          <el-link
            type="primary"
            :underline="false"
            :icon="CirclePlus"
            @click="createTeam"
            style="font-size: 50px; margin-left: 45%; margin-top: 12%"
          ></el-link>
        </div>
        <el-dialog v-model="showDialog" title="创建团队" width="30%">
          <span>
            <el-input v-model="input" placeholder="输入团队名" />
          </span>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="submit"> 提交 </el-button>
            </span>
          </template>
        </el-dialog>
      </el-card>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from 'vue'
import axios, { Axios } from 'axios'
import { useRouter, useRoute } from 'vue-router'
import moment from 'moment'
import { useUserStore } from '@/stores/userStore'
import { CirclePlus } from '@element-plus/icons-vue'
import httpInstance from '@/utils/http'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const userId = userStore.userInfo.data.userid
const tableData = reactive([])
const loadTeam = () => {
  httpInstance
    .post('/getAllGroup', {
      userid: userId,
    })
    .then((res) => {
      console.log(res.data)
      res.data.forEach((element) => {
        tableData.push(element)
      })
    })
}

const openTeam = (teamid) => {
  userStore.pages.teamId = teamid
  router.push({ name: 'member' })
  route.meta.showFooter = false
}

const showDialog = ref(false)
const createTeam = () => {
  showDialog.value = true
}
const userName = userStore.userInfo.data.username
const input = ref('')
const submit = () => {
  console.log(input.value)
  httpInstance
    .post('/buildGroup', {
      groupname: input.value,
      buildername: userName,
      userid: userId,
    })
    .then((res) => {
      console.log(res.data)
      tableData.length = 0
      loadTeam()
      ElMessage({
        message: '创建成功！',
        type: 'success',
      })
    })
  input.value = ''
  showDialog.value = false
}

const dateFormat = (row, column) => {
  var date = row[column.property]
  if (date === undefined) {
    return ''
  }
  return moment(date).utcOffset(8).format('YYYY-MM-DD HH:mm')
}

onBeforeMount(() => {
  loadTeam()
})
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px #888888;
}
.teamcard {
  height: auto;
}

.divteamCard {
  margin: 20px;
  width: 45%;
  float: left;
}

.teamCard {
  background-color: rgba(226, 231, 236, 0.667);
  height: 200px;
  border-radius: 10px;
  transition-duration: 0.5s;
  padding: 20px;
  /* text-align: center; */
}

.teamCard:hover {
  background-color: #d9ecff83;
  box-shadow: 1px 1px 10px #888888;
  color: #79bbff;
}

.teamCard-create {
  background-color: rgba(226, 231, 236, 0.667); /*rgba(226, 231, 236, 0.242);*/
  height: 200px;
  border-radius: 10px;
  transition-duration: 0.5s;
  padding: 20px;
}

.teamDiscription {
  margin-top: 5px;
  margin-bottom: 10px;
}

.cardTitle {
  font-size: 20px;
  font-weight: bold;
}
</style>
