<template>
  <div class="container">
      搜索模块
       <!-- 搜索组件一级路由   返回上一个页面-->
       <!-- @click-left  点击左侧事件 -->
       <!-- $router.back()  返回上一页 -->
    <van-nav-bar left-arrow title='搜索中心' @click-left="$router.back()"></van-nav-bar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
