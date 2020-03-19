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
          <van-cell v-for="item in articles" :key="item" >
            <!--放置元素 文章列表的循环项 无图、单图、三图-->
            <!-- 三图 -->
            <div class="article_item">
                <h3 class="van-ellipsis">{{item.title}}</h3>
              <!-- <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3> -->
             <!-- 三图 -->
              <div class="img_box" v-if="item.cover.type===3">
                  <!-- 图片组件用的是vant的组件 需要使用该组件 进行图片懒加载 -->
                <van-image class="w100" fit="cover" :src="item.cover.images[0]" />
                <van-image class="w100" fit="cover" :src="item.cover.images[1]"/>
                <van-image class="w100" fit="cover" :src="item.cover.images[2]" />
              </div>

              <!-- 单图 暂时隐藏掉单图-->
               <div class="img_box" v-if="item.cover.type === 1">
                 <!-- 单图取第一个 -->
                <van-image class="w100" fit="cover" :src="item.cover.images[0]" />
              </div>

              <!-- 作者信息 -->
                <div class="info_box">
                <span>{{ item.aut_name }}</span>
                <span>{{ item.comm_count }}评论</span>
                <span>{{ item.pubdate }}</span>
                <span class="close">
                  <van-icon name="cross"></van-icon>
                </span>
              </div>
            </div>

          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 引入获取文章模块
import { getArticles } from '@/api/articles'
export default {
  data () {
    return {
      refreshSuccessText: '',
      downLoading: false, // 表示下拉刷新
      upLoading: false, // 表示是否开启了上拉加载 默认值false
      finished: false, // 表示 是否已经完成所有数据的加载
      articles: [], // 文章列表篇
      timestamp: null // 定义一个 timestamp属性,用来存放时间戳
    }
  },
  //
  props: {
    channel_id: {
      required: true, // 要求必须传该props属性 否则报错
      type: Number, // type是指定的类型
      default: null// default是默认值
    }
  },
  methods: {
    // onLoad 是会自动执行
    // 上拉加载
    async onLoad () {
      console.log('开始加载数据')
      //   如果数据已经加载完毕应该把finished设置为true
      //
      //   if (this.articles.length > 50) {
      //     //   如果此时记录大于50
      //     this.finished = true
      //   } else {
      //     const arr = Array.from(
      //       Array(10),
      //       (value, index) => this.articles.length + index + 1
      //     )
      //     //   上拉加载不是覆盖之前的数据应该把数据追加到数组的队尾+
      //     this.articles.push(...arr)
      //     //   添加完数据，需要手动关闭loading
      //     this.upLoading = false
      //   }
      //   // 下面这么写 依然不能关掉加载状态 为什么 ? 因为关掉之后  检测机制  高度还是不够 还是会开启
      //   // 如果你有数据 你应该 把数据到加到list中
      //   // 如果想关掉
      //   //   setTimeout(() => {
      //   //     this.finished = true // 表示 数据已经全部加载完毕 没有数据了
      //   //   }, 1000) // 等待一秒 然后关闭加载状态

      // this.timestamp || Date.now()  如果有历史时间戳 用历史时间戳 否则用当前时间戳
      //   channel_id:  指的是当前频道
      const data = await getArticles({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() }) // this.channel_id指的是 当前的频道id
      //  获取内容
      this.articles.push(data.results) // 将数据追加到队尾
      this.upLoading = false // 关闭加载状态
      // 将历史时间戳 给timestamp  但是 赋值之前有个判断 需要判断一个历史时间是否为0
      // 如果历史时间戳为 0 说明 此时已经没有数据了 应该宣布 结束   finished true
      if (data.pre_timestamp) {
        // 如果有历史时间戳 表示 还有数据可以继续进行加载
        this.timestamp = data.pre_timestamp
      } else {
        // 表示没有数据可以请求了
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      await this.$sleep() // 认为控制
      // 触发下拉刷新
      // 下拉刷新永远拉取的是最新的数据
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: Date.now() // 永远刷新最新的时间戳
      })
      if (data.results.length) {
        // 如果长度大于0 表示有数据
        this.articles = data.results // 将历史数据全都覆盖掉了
        // 假如你之前 已经将 上拉加载设置成finished设置成true了
        // 表示 我们还需要继续往下拉 就需要把原来的状态再次打开
        this.finished = false
        // 注意我们依然需要获取此次的历史事件戳
        this.timestamp = data.pre_timestamp // 赋值历史时间戳 因为当你下拉刷新之后 上拉加载的时候 要用到这个历史事件戳
        this.refreshSuccessText = `更新了${data.results.length}条数据`
      } else {
      //  如果没有数据更新  什么都不需要变化
        this.refreshSuccessText = '已是最新数据'
      }
    }
    // 需要判断最新的时间戳

    // console.log('下拉刷新')
    // setTimeout(() => {
    //   const arr = Array.from(
    //     Array(2),
    //     (value, index) => '追加' + (index + 1)
    //   )
    //   this.articles.unshift(...arr) // 将数据添加到队首
    //   this.downLoading = false // 关掉下拉状态
    //   this.refreshSuccessText = `更新了${arr.length}条数据`
    // }, 1000)

  }
}
</script>

<style lang='less' scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
