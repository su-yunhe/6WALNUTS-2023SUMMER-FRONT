<template>
    <Main>
    <div>
        <el-table :data="memberList" stripe style="width: 100%">
            <el-table-column prop="image" label="" width="80" />
            <el-table-column prop="userName" label="用户名" width="180" />
            <el-table-column prop="userRealName" label="姓名" width="180" />
            <el-table-column prop="usertype" label="身份" width="180">
                <template #default={row}>
                    <el-tag v-if="row.usertype == 1" class="ml-2" type="warning">创建者</el-tag>
                    <el-tag v-if="row.usertype == 2" class="ml-2" type="success">管理员</el-tag>
                    <el-tag v-if="row.usertype == 3" class="ml-2" type="info">成员</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="userEmail" label="邮箱" width="180"/>
        </el-table>
    </div>
    </Main>
</template>

<script setup>
import { reactive,onBeforeMount } from 'vue'
import axios from 'axios'

const memberList = reactive([])
const loadMember = () => {
    axios.post("/test/memberList").then(res => {
        console.log(res.data.data)
        res.data.data.forEach(element => {
            memberList.push(element)
        })
    })
}

onBeforeMount( () => {
    loadMember()
})

</script>