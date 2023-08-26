<template>
    <div>
      <div v-show="$route.meta.showFooter">
        <el-card class="box-card teamcard">
        <template #header>
        <div class="card-header">
            <el-table :data="tableData" stripe style="width: 100%" @row-click="openTeam">
            <el-table-column prop="groupId" label="团队id" width="100" />
            <el-table-column prop="groupName" label="团队名称" width="180" />
            <el-table-column prop="groupBuilder" label="创建者" width="180" />
            <el-table-column prop="buildTime" label="创建时间" :formatter="dateFormat" width="240" />
            <el-table-column prop="occupation" label="我的身份" />
            </el-table>
        </div>
        </template>
        <el-button type="primary" round @click="createTeam">创建</el-button>
        <el-dialog v-model="showDialog" title="创建团队" width="30%">
          <span>
            <el-input v-model="input" placeholder="输入团队名" />
          </span>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="submit">
                提交
              </el-button>
            </span>
          </template>
        </el-dialog>
        </el-card>
      </div>
    <router-view></router-view>
    </div>
</template>

<script lang='ts' setup>
import { ref,onBeforeMount, reactive } from 'vue';
import axios , { Axios }from 'axios'
import { useRouter,useRoute } from 'vue-router';
import moment from 'moment'


const router = useRouter()
const route = useRoute()

const tableData = reactive([])
const loadTable = () => {
  axios.post("/test",{//http://8.130.137.197/getAllGroup
    userid:1
  }).then( res => {
    console.log(res.data)
    res.data.dataList.forEach(element => {
      tableData.push(element)
    })
  })
}
const openTeam = (row) => {
  const id = row.groupId
  router.push({name:'detail',params:{id}})
  route.meta.showFooter = false
  console.log(route.meta)
}

const showDialog = ref(false)
const createTeam = () => {
  showDialog.value = true
}

const input = ref('')
const submit = () => {
  axios.post('/test/create',{
    teamName:input.value
  }).then(res => {
    console.log(res.data)
    
  })  
  input.value = ''
  showDialog.value = false
}

const dateFormat = (row, column) => {
    var date = row[column.property];
    if(date === undefined){
        return ''
    }
    return moment(date).utcOffset(8).format("YYYY-MM-DD HH:mm")
}

onBeforeMount( () => {
  loadTable()
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
.teamcard{
  height: auto;
}
</style>