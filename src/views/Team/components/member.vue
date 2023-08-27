<template>
    <Main>
    <div>
        <el-table :data="userStore.pages.memberlist" :default-sort="{ prop: 'usertype', order: 'ascending' }" stripe style="width: 100%">
            <el-table-column prop="userName" label="用户名" width="180" />
            <el-table-column prop="userRealName" label="姓名" width="180" />
            <el-table-column prop="usertype" label="身份" width="180">
                <template #default={row}>
                    <el-tag v-if="row.usertype == 1" class="ml-2" type="warning">创建者</el-tag>
                    <el-tag v-if="row.usertype == 2" class="ml-2" type="success">管理员</el-tag>
                    <el-tag v-if="row.usertype == 3" class="ml-2" type="info">成员</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="userEmail" label="邮箱" width="200"/>
            <el-table-column prop="operation" label="操作" width="150">
                <template #default={row}>
                    <el-popconfirm title="确定要撤销成员的管理员身份吗?" @confirm="cancelAdmin(row.userName)" hide-after="50">
                        <template #reference>
                            <el-button v-if="row.usertype == 2" type="danger" plain round>撤销管理</el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm title="确定要将成员从团队移除吗？" @confirm="removeMember(row.userName)" hide-after="50">
                        <template #reference>
                            <el-button v-if="row.usertype == 3" type="danger" plain round>移除成员</el-button>
                        </template>
                    </el-popconfirm>
                        </template>
            </el-table-column>
        </el-table>
    </div>
    </Main>
</template>

<script setup>
import { reactive,onBeforeMount } from 'vue'
import axios from 'axios'
import httpInstance from '@/utils/http'
import { useUserStore } from '@/stores/userStore';
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const userId = userStore.userInfo.userid

const cancelAdmin = (userName) => {
    axios.post("/test",{
        adminid: userId,
        groupid: userStore.pages.teamId,
        username: userName
    }).then( res => {
        console.log(res)
        ElMessage({
            message: '撤销管理员成功！',
            type: 'success'
        })
    })
}

const removeMember = (userName) => {
    axios.post("/test",{
        adminid: userId,
        groupid: userStore.pages.teamId,
        username: userName
    }).then( res => {
        console.log(res)
        ElMessage({
            message: '移除成员成功！',
            type: 'success'
        })
    })
}

onBeforeMount( () => {
    userStore.pages.memberlist.length = 0
    userStore.loadMember()
})

</script>