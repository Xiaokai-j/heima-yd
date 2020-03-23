<template>
  <div class="container">
      <!--导航组件 采用vant的导航组件 来实现 -->
      <!--当页面地址是/user 的时候 应该隐藏导航栏 否则不隐藏  -->
      <!-- @事件名="逻辑" -->
      <van-nav-bar @click-right="$router.push('/search')"  fixed title="黑马头条" right-text="搜索" v-if="showNavBar"></van-nav-bar>
       <!-- 二级路由容器  首页/问答/视频/我的-->
       <!-- 判断当前的地址 如果是/user 就给一个 noTop Class -->
       <!-- :class="{ 名称: 布尔值 }" -->
    <div class="my-wrapper" :class="{ noTop: !showNavBar }">
      <router-view></router-view>
    </div>
    <!-- 标签栏组件 -->
    <!-- route 表示开启路由模式 -->
    <van-tabbar route>
      <!-- router-link  to  -->
      <!-- 点击标签栏跳转事件 to="/"-->
      <!-- van-tabbar-item 可以当作 router-link 使用 -->
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  computed: {
    // 是否显示navbar
    showNavBar () {
      // this  指向 组件实例
      return this.$route.path !== '/user'
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
