<template>
  <div>
    <el-card class="box-card teamcard">
      <el-link
        type="primary"
        :underline="false"
        :icon="ArrowLeftBold"
        @click="backToTeam"
      ></el-link>
      <span class="teamName">
        <el-text tag="b" size="large">{{ teamName }}</el-text>
      </span>
      <span class="team-right">
        <el-tag v-if="myType == 3" class="mx-1" size="large">成员</el-tag>
        <el-tag v-if="myType == 1" class="ml-2" size="large" type="warning"
          >创建者</el-tag
        >
        <el-tag v-if="myType == 2" class="ml-2" size="large" type="success"
          >管理员</el-tag
        >
        <el-popover placement="bottom" :width="150" trigger="click">
          <el-link
            class="teamLink"
            :underline="false"
            :icon="CirclePlus"
            :disabled="myType != 1 && myType != 2"
            @click="callAddMember"
            >添加成员</el-link
          >
          <el-link
            class="teamLink"
            v-if="myType == 1"
            :underline="false"
            :icon="User"
            @click="callAddAdmin"
            >添加管理员</el-link
          >
          <template #reference>
            <el-link
              :underline="false"
              :icon="CaretBottom"
              style="margin: 6px; margin-bottom: 12px"
            ></el-link>
          </template>
        </el-popover>
      </span>
      <div class="common-layout">
        <el-container>
          <el-aside width="160px">
            <div class="teamNavigator">
              <el-radio-group
                class="radio"
                v-model="isCollapse"
                style="margin-bottom: 20px"
                size="small"
              >
                <el-radio-button :label="true"
                  ><el-icon><Fold /></el-icon
                ></el-radio-button>
                <el-radio-button :label="false"
                  ><el-icon><Expand /></el-icon
                ></el-radio-button>
              </el-radio-group>
              <el-menu
                default-active="/team/detail/member"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                router
              >
                <el-menu-item index="/team/detail/member">
                  <el-icon><User /></el-icon>
                  <template #title>成员</template>
                </el-menu-item>
                <el-menu-item index="/team/detail/notice">
                  <el-icon><Memo /></el-icon>
                  <template #title>公告</template>
                </el-menu-item>
                <el-menu-item index="/team/detail/project">
                  <el-icon><Suitcase /></el-icon>
                  <template #title>项目</template>
                </el-menu-item>
                <el-menu-item index="/team/detail/chat">
                  <el-icon><ChatDotSquare /></el-icon>
                  <template #title>聊天</template>
                </el-menu-item>
              </el-menu>
            </div>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </div>
      <Dialogs ref="RefChild"></Dialogs>
    </el-card>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeftBold,
  CaretBottom,
  ChatDotRound,
  ChatDotSquare,
  CirclePlus,
  DArrowLeft,
  DArrowRight,
  Expand,
  Fold,
  Suitcase,
  User,
} from '@element-plus/icons-vue'
import BubleLeft from '../../Chat/components/bubleLeft.vue'
import BubleRight from '../../Chat/components/bubleRight.vue'
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import Member from '../components/member.vue'
import Dialogs from '../components/dialogs.vue'
import { storeToRefs } from 'pinia'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import httpInstance from '@/utils/http'

const isCollapse = ref(false)
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const userId = userStore.userInfo.data.userid

const team_id = userStore.pages.teamId
const teamName = ref('')
const getName = () => {
  console.log('userid:' + userId)
  httpInstance
    .post('/getGroupName', {
      groupid: team_id,
    })
    .then((res) => {
      teamName.value = res.data.GroupName
    })
}

const myType = ref()
const getType = () => {
  httpInstance
    .post('/getType', {
      userid: userId,
      groupid: team_id,
    })
    .then((res) => {
      console.log(res.data.userType)
      myType.value = res.data.userType
    })
}

const RefChild = ref()
const callAddMember = () => {
  RefChild.value.addMember()
}
const callAddAdmin = () => {
  RefChild.value.addAdmin()
}

const messages = reactive([
  {
    content: '这是一条消息',
  },
  {
    content: '这是另一条消息',
  },
])

const backToTeam = () => {
  router.push({ name: 'team' })
}

onBeforeMount(() => {
  getName()
  getType()
})

onMounted(() => {
  userStore.pages.tabName = 'members'
})
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px #888888;
}
.teamName {
  position: absolute;
  left: 50%;
  text-align: center;
  margin: auto;
}
.el-tab {
  margin-top: 20px;
  height: 1000px;
}
.teamcard {
  height: 1000px;
}
.team-right {
  float: right;
}

.teamLink {
  margin-top: 5px;
  margin-bottom: 5px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100px;
  min-height: 400px;
}

.teamNavigator {
  margin-top: 20px;
  margin-left: 20px;
}

.radio {
  margin-left: 28px;
}
</style>
