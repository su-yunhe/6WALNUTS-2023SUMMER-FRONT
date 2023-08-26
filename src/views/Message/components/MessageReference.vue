<script setup>
  import {ref,onMounted} from 'vue';
  import axios from "axios";
  import {useUserStore} from "@/stores/userStore";
  const userStore=useUserStore();/*调取本地用户信息*/
  const referenceList=ref([]);/*全体未读消息列表*/
  const alreadyRead=ref([]);/*已读消息id列表*/
  const success=ref(false);/*是否成功获取全体未读消息*/
  const close=ref(0);/*是否显示删除标志*/
  const totalNum=ref(0);/*总消息数目*/
  const checkContent=ref(0);/*是否显示具体内容标志*/
  //刷新页面的时候向后端发送请求
  onMounted(async ()=>{
    try{
      /*发送post请求所有未读信息*/
      const requestData={
        userid:userStore.userInfo
      }
      const response=await axios.post('https://e40eac3b-612c-473f-a4c6-a991065e64f6.mock.pstmn.io/message/reference/queryAll',requestData);
      if(response.data.msg !== null){success.value=true;}
      /*获取到相应之后解析并放入referenceList*/
      const arr=response.data.data;
      totalNum.value=arr.length;
      for(let i=0;i<arr.length;i++){
        referenceList.value.push({
          content:arr[i].content,
          time:arr[i].time,
          name:arr[i].senderName,
          groupName:arr[i].groupname,
          messageId:arr[i].messageId
        })
        if(arr[i].state === true){
          alreadyRead.value.push(arr[i].messageId);
        }
      }
    }catch (error){
      /*连接失败则弹窗提示网络错误*/
      alert('Network Error!');
    }
  })
  //读取消息并将状态置为已读
  async function readMessage(messageId){
    /*先显示可删除标志*/
    close.value=messageId;
    /*记录是否已读*/
    if(alreadyRead.value.includes(messageId)){
      return;
    }else {
      alreadyRead.value.push(messageId);
    }
    /*发送请求*/
    const requestData={
      userid:userStore.userInfo,
      messageid:messageId,
    }
    try{
      const response=await axios.post('https://e40eac3b-612c-473f-a4c6-a991065e64f6.mock.pstmn.io/message/reference/read',requestData);
      console.log(response.data.msg);
    }catch (error){
      alert('Network error!');
    }
  }
  /*鼠标离开后隐藏删除按钮*/
  function hideCloseButton(){
    close.value=0;
  }
  //删除某条消息
  async function deleteMessage(messageId){
    /*从reference数组中删除消息*/
    const pos=referenceList.value.findIndex(item=>item.messageId === messageId);
    referenceList.value.splice(pos,1);
    /*给后端发送请求*/
    try{
      const requestData={
        userid:userStore.userInfo,
        messageid:messageId
      }
      const response=await axios.post('https://e40eac3b-612c-473f-a4c6-a991065e64f6.mock.pstmn.io/message/reference/delete',requestData);
      console.log(response.data.msg);
    }catch (error){
      alert('Network Error!')
    }
  }
  //一键全部已读
  function readAll(){
    /*遍历所有消息*/
    for(let i=0;i<referenceList.value.length;i++){
      readMessage(referenceList.value[i].messageId);
    }
    close.value=0;/*修改小bug，因为readMessage里修改了close所以会等于最后一个li的messageId*/
  }
  //一键删除所有已读
  async function deleteAll(){
    /*发送请求*/
    const requestData={
      userid:userStore.userInfo
    }
    try{
      const response=await axios.post('https://e40eac3b-612c-473f-a4c6-a991065e64f6.mock.pstmn.io/message/reference/deleteAll',requestData);
      console.log(response.data.msg);
    }catch (error){
      alert('Network Error!')
    }
    /*删除已读显示*/
    for(let i=referenceList.value.length-1;i>=0;i--){
      /*反向遍历保证splice正确*/
      if(alreadyRead.value.includes(referenceList.value[i].messageId)){
        referenceList.value.splice(i,1);
      }
    }

  }
  //查看详情
  function showContent(messageId){
    checkContent.value=messageId;
  }
  function hideContent(){
    checkContent.value=0;
  }
</script>

<template>
<div id="global">
  <!--消息列表-->
  <div id="reference">
    <div id="referenceHead">@我的消息列表</div>
    <transition name="float">
    <div id="referenceNone" v-show="referenceList.length===0">空空如也</div>
    </transition>
    <transition-group name="slide_show">
    <ul id="referenceContent" v-if="success">
      <!--鼠标划过表示完成已读-->
      <li v-for="(val,index) in referenceList" :key="val.messageId"
          @mouseover.self="readMessage(val.messageId)"
          @mouseleave.self="hideCloseButton"
      >
        <!--显示基本信息-->
        <div class="referenceId">{{index+1}}</div>
        <div class="referenceTime">{{val.time}}</div>
        <div class="referenceUser">{{val.name}}</div>
        在
        <div class="referencePlace">{{val.groupName}}</div>
        @到了你
        <div class="referenceLink">
            <el-button type="success" size="large"
                       @mouseover.self="showContent(val.messageId)"
                       @mouseleave.self="hideContent()"
                       plain
            >
              查看详情
            </el-button>
        </div>
        <Transition name="float_show">
        <div class="referenceLinkContent" v-if="checkContent === val.messageId">
          {{val.content}}
        </div>
        </Transition>
        <!--设置是否已读-->
        <div v-show="!(alreadyRead.includes(val.messageId))" class="referenceStatus"></div>
        <!--显示可删除标志-->
        <Transition name="close">
          <div v-if="close===val.messageId" class="referenceClose" @click.self="deleteMessage(val.messageId)">x</div>
        </Transition>
      </li>
    </ul>
    </transition-group>
  </div>
  <!--功能界面-->
  <div id="functions">
    <!--显示总体有多少未读消息-->
    <p id="totalUnreadMessage">
      您一共有
      <el-text type="danger" size="large" tag="b">{{totalNum-alreadyRead.length}}</el-text>
      条未读消息
    </p>
    <!--一键已读按钮-->
    <div id="readAllButton">
      <el-button type="primary" size="large" color="#626aef" @click="readAll" plain>一键已读全部消息</el-button>
    </div>
    <!--一键删除所有已读按钮-->
    <div id="deleteAllButton">
      <el-button type="primary" size="large" color="#626aef" @click="deleteAll" plain>一键删除所有已读</el-button>
    </div>
  </div>
</div>
</template>

<style scoped>
  #global{
    margin:0;
    padding:0;
    background-image:url("@/assets/images/skyline.png");
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    height:100%;
    display: flex;
  }
/*过渡效果*/
  /*加载进入效果*/
  .slide_show-enter-active{
    transition: all 0.3s ease-out;
  }
  .slide_show-enter-from{
    transform: translateY(100px);
    opacity: 0;
  }
  /*加载关闭按钮效果*/
  .close-enter-active,.close-leave-active{
    transition: opacity 0.2s ease-in;
  }
  .close-enter-from,.close-leave-to{
    opacity: 0;
  }
  /*加载全部读完效果*/
  .float-enter-from{
    opacity: 0;
    transform: translateY(100px);
  }
  .float-enter-active{
    transition: all 0.5s ease-in;
  }
  /*加载显示内容效果*/
  .float_show-enter-from,.float-leave-to{
    opacity: 0;
    transform: translateX(-20px);
  }
  .float_show-enter-active,.float_show-leave-active{
    transition: all 0.2s ease-in;
  }
/*内容界面*/
  #reference{
    padding:30px;
    width: 70%;
    color:white;
  }
  /*头部文字*/
  #referenceHead{
    font-size: 30px;
    text-align: center;
  }
  #referenceNone{
    font-size: 30px;
    text-align: center;
    margin-top: 100px;
    font-family: 华文彩云,sans-serif;
    color: rgba(166, 162, 162, 0.9);
  }
  /*每一条背景样式*/
  #reference ul{
    display: flex;
    flex-direction: column;
  }
  #reference ul li{
    background-color: rgba(195, 201, 201, 0.6);
    display: flex;
    align-items: center;
    border-radius: 20px;
    height:70px;
    margin:20px;
    padding:10px;
    position: relative;
    font-size: 20px;
  }
  #reference ul li:hover{
    background-color: rgba(172, 175, 175, 0.9);
  }
  #reference ul li .referenceId{
    position: absolute;
    font-size: 14px;
    top: -5px;
    left: -5px;
    background-color: #031d38;
    width:20px;
    height:20px;
    text-align: center;
    border-radius: 50%;
  }
  #reference ul li .referenceTime{
    color: #414040;
    font-family: 华文仿宋,sans-serif;
    margin:0 15px 0 10px;
    font-size: 22px;
  }
  #reference ul li .referenceUser{
    color: blue;
  }
  #reference ul li .referencePlace{
    color: #1dc779;
  }
  #reference ul li .referenceLink{
    position: absolute;
    right:30px;
    border-radius: 10px;
    padding: 10px;
  }
  #reference ul li .referenceLinkContent{
    width:100%;
    position: absolute;
    left: 0;
    top:100%;
    z-index: 200;
    word-wrap: anywhere;
    font-size: 16px;
    background-image: linear-gradient(rgba(55, 150, 245, 0.6),lightskyblue);
    padding:5px 10px;
    border-radius: 5px;
    color: #211d1d;
    font-family: Lato,sans-serif;
  }
  #reference ul li .referenceStatus{
    background-color: red;
    position: absolute;
    width: 10px;
    height: 10px;
    right:0;
    top:0;
    border-radius: 50%;
  }
  /*删除标志*/
  #reference ul li .referenceClose{
    position: absolute;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 50%;
    right: -15px;
    background-color: rgba(248, 10, 10, 0.9);
  }
  #reference ul li .referenceClose:hover{
    background-color: rgb(236, 99, 99);
  }
/*功能界面*/
  #functions{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    color:white;
    font-size:20px;
    font-family: 华文彩云,sans-serif;
    border-left: 1px solid white;
    background-color: rgba(178, 176, 176, 0.2);
    height: 100vh;
    position: sticky;
    top:0;
    z-index: 100;
  }
  #functions #totalUnreadMessage{
    margin-top: 80px;
    padding:5px;
  }
  #functions #readAllButton{
    margin: 20px;
  }
  #functions #deleteAllButton{
    margin:20px;
  }
</style>