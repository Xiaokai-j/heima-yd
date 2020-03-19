<template>
  <!-- 文章列表组件  放置列表 -->
  <!-- van-list 可以帮助我们实现上拉加载  需要一些变量 -->
  <!-- 这里放置这个div的目的是 形成滚动条, 因为我们后期要做 阅读记忆 -->
  <!-- 阅读记忆  上次你阅读到哪  回来之后还是哪-->
  <div class="scroll-wrapper">
    <!-- 文章列表 -->
    <!-- van-list组件 如果不加干涉, 初始化完毕 就会检测 自己距离底部的长度,如果超过了限定 ,就会执行 load事件  自动把
       绑定的 loading 变成true
    -->
    <!-- van-pull-refresh  -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSuccessText">
      <van-list finished-text="没有了" v-model="upLoading" :finished="finished" @load="onLoad">
        <!-- 循环内容 -->
        <van-cell-group>
          <van-cell v-for="item in articles" :key="item" title="1123" value="789+item"></van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      refreshSuccessText: '',
      downLoading: false, // 表示下拉刷新
      upLoading: false, // 表示是否开启了上拉加载 默认值false
      finished: false, // 表示 是否已经完成所有数据的加载
      articles: [] // 文章列表篇
    }
  },
  methods: {
    onLoad () {
      console.log('开始加载数据')
      //   如果数据已经加载完毕应该把finished设置为true
      //
      if (this.articles.length > 50) {
        //   如果此时记录大于50
        this.finished = true
      } else {
        const arr = Array.from(Array(10), (value, index) => this.articles.length + index + 1

        )
        //   上拉加载不是覆盖之前的数据应该把数据追加到数组的队尾+
        this.articles.push(...arr)
        //   添加完数据，需要手动关闭loading
        this.upLoading = false
      }
      // 下面这么写 依然不能关掉加载状态 为什么 ? 因为关掉之后  检测机制  高度还是不够 还是会开启
      // 如果你有数据 你应该 把数据到加到list中
      // 如果想关掉
      //   setTimeout(() => {
      //     this.finished = true // 表示 数据已经全部加载完毕 没有数据了
      //   }, 1000) // 等待一秒 然后关闭加载状态
    },
    // 下拉刷新
    onRefresh () {
      // 触发下拉刷新
      console.log('下拉刷新')
      setTimeout(() => {
        const arr = Array.from(Array(2), (value, index) => ('追加' + (index + 1)))
        this.articles.unshift(...arr) // 将数据添加到队首
        this.downLoading = false // 关掉下拉状态
        this.refreshSuccessText = `更新了${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style>
</style>
