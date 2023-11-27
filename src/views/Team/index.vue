<template>
  <div id="mainBackground">
    <Navigator></Navigator>
    <div v-show="$route.meta.showFooter" style="margin: 30px;margin-bottom: 750px;">
      <!-- <el-card class="box-card teamcard"> -->
        <div class="divteamCard teamCard-create">
          <el-link
            id="createTeam"
            type="primary"
            :underline="false"
            :icon="CirclePlus"
            @click="createTeam"
            style="font-size: 50px; margin-left: 45%; margin-top: 12%"
          ></el-link>
        </div>
        <div
          v-for="item in tableData"
          :key="item"
          class="divteamCard"
          @click="openTeam(item.groupId)"
        >
          <div class="teamCardBackground"></div>
          <div class="teamCard">
            <div class="cardText">
              <p class="h3"> {{ item.groupName }} </p>
              <p class="p">
                <span>
                  创建人
                  <el-divider direction="vertical" />
                  {{ item.groupBuilder }}
                </span>
                <span style="margin-left: 30%;">
                  创建时间
                  <el-divider direction="vertical" />
                  {{ moment(item.buildTime).utcOffset(8).format('YYYY-MM-DD HH:mm') }}
                </span>
              </p>
            </div>
          </div>
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
      <!-- </el-card> -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, reactive } from 'vue'
import axios, { Axios } from 'axios'
import { useRouter, useRoute } from 'vue-router'
import moment from 'moment'
import { useUserStore } from '@/stores/userStore'
import { CirclePlus } from '@element-plus/icons-vue'
import httpInstance from '@/utils/http'
import { ElMessage } from 'element-plus'
import Navigator from './components/Navigator.vue'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const userId = userStore.userInfo.userid
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
const userName = userStore.userInfo.username
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

const showNewUserIntro = () => {
  const showIntro = userStore.pages.isNewUser[0]
  if(showIntro){
    userStore.handleStart()
    userStore.pages.isNewUser[0] = false
  }
}

onMounted(() => {
  showNewUserIntro()
})

onBeforeMount(() => {
  loadTeam()
})
</script>

<style scoped>
@import '../../assets/font/font.css';
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
  background-color: rgba(0,0,0,0.1);
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px #888888;
}
.divteamCard {
  margin: 20px;
  width: 45%;
  float: left;
  background: linear-gradient(135deg, #ebadb6 0%, #aceae1 100%);
 border-radius: 7px;
 transition-duration: 0.5s;
 box-shadow: 20px 20px 60px #bebebe;
}

.divteamCard:hover{
  transform: translateY(-20px);
}

.teamCardBackground{
  height: 80px;
}

.teamCard {
  background-color: rgba(245, 249, 253, 0.84);
  height: 120px;
  border-radius: 10px;
  transition-duration: 0.5s;
  padding: 10px;
  /* text-align: center; */
}

.teamCard:hover {
  background-color: #3f9df637;
  /* transform: translateY(-10px); */
  box-shadow: 1px 1px 10px #888888;
  color: #79bcffe4;
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

#mainBackground{
  /* background-image: url('/src/assets/images/Bora Bora.jpg'); */
  background-size: 100% 100%;
  min-height: 100vh;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background: #FFEEEE;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #f6faef, #fef4f4);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #eff4e6, #fbf1f1); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.cardText {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: space-around;
}

.cardText .h3 {
  font-family: 'Lucida';
  font-size: 20px;
  font-weight: 600;
  color: black;
}

.cardText .p {
  font-family: 'Lucida';
  color: #999999;
  font-size: 15px;
  margin-top: 15px;
}
</style>
