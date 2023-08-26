<script setup>

</script>

<template>
  <div id="message">
    <!--导航栏-->
    <div id="messageNavigator">
      <!--总体导航栏-->
      <div id="navigator">
        <!--导航栏头部-->
        <div id="navigatorHead">
          <!--图片-->
          <div id="navigatorHeadImage">
            <img src="@/assets/images/ringBell.png" alt="<network error>">
          </div>
          <!--文字-->
          <p id="navigatorHeadDescription">消息中心</p>
        </div>
        <!--导航栏内容-->
        <div id="navigatorContent">
          <el-menu id="navigatorMenu" active-text-color="blue">
            <el-menu-item index="1">
              <router-link to="/message/reference" class="navigates">群聊消息</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/message/document" class="navigates">文档消息</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/message/document" class="navigates">私聊消息</router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <!--内容-->
    <div id="messageContent">
      <router-view></router-view>
    </div>
  </div>

</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
  /*总体界面显示*/
  *{
    margin:0;
    padding:0;
    overflow: visible !important;
  }
  #message{
    display: flex;
  }
  #messageNavigator{
    width:22%;
    height:100vh;
    border-right:2px solid grey;
    position: sticky;
    top:0;
    z-index: 100;
  }
  #messageContent{
    display: flex;
    flex-direction: column;
    width:78%;
    min-height:100vh;
  }


  /*导航栏部分*/
  #navigator{
    background-color:black;
    width: 100%;
    height:100%;
    padding-top: 20px;
    color:white;
    font-family: 'Lato',sans-serif;
    position: sticky;
    top:0;
  }
  /*导航栏头部*/
  #navigatorHead{
    display: flex;
    justify-content: center;
    align-items: center;
    height:50px;
    margin-bottom: 20px;
  }
  #navigatorHeadImage{
    height: 100%;
    margin-right:20px;
  }
  #navigatorHeadImage img{
    border-radius: 50%;
  }
  #navigatorHeadDescription{
    display: flex;
    height:100%;
    font-size: 30px;
    font-family: 楷体,sans-serif;
    align-items: center;
  }
  /*导航栏内容*/
  #navigatorMenu{
    width: 100%;
    background-color: black;
    text-align: center;
  }
  .el-menu-item:hover{
    background-color: #777575;
  }
  .el-menu-item.is-active{
    background-image: linear-gradient(90deg,#0f83fc,transparent);
  }
  .navigates{
    text-align: center;
    color: white;
    width: 100%;
    font-family: Arial,sans-serif;
    font-size: 16px;
  }

</style>