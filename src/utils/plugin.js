/** **
 *  plugin.js专门负责提供小函数以及vue中常用的过滤器及函数
 *
 * ***/
// 安装dayjs插件 npm i dayjs -S
// 封装一个相对时间函数
import dayjs from 'dayjs' // 引入dayjs插件
import 'dayjs/locale/zh-cn'// dayjs 不会自动引入语言包
import relativeTime from 'dayjs/plugin/relativeTime'// 引入相对时间插件

// 相当于dayjs扩展
dayjs.extend(relativeTime)

export default {
  // 导出一个默认对象
  install (Vue) {
    //   该方法会在Vue.use时调用
    // 执行此行代码时 Vue.prototype.$notify 应该已经挂载完成
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params }) // 小伎俩
    // 给Vue的e的原型属性赋值一个函数 自定义一个函数名
    Vue.prototype.$sleep = sleep // 定义一个原型属性$sleep 所有组件都有了这个属性

    // 需要用到之前学过的过滤器 局部过滤器
    // Vue.filter(名称，函数)
    // 注册一个全局过滤器，任何位置都能使用
    Vue.filter('relTime', relTime)
  }
}
// 休眠函数
/***
 *小技巧
 *现在用户加载太快,对服务器压力有点大,
 *可以让用户的请求别那么快发出去,
 *可 以自己封装一个小休眠函数
 * ****/
// time = 500 如果你传入time 用你的 如果你没传入 用500
function sleep (time = 500) {
  // 返回一个promise
  return new Promise(function (resolve, reject) {
    // 肯定会成功执行 但是会有延迟
    setTimeout(() => resolve(), time)
  })
}
/****
 *次函数用来将日期转换为相对时间
 *
 * ****/
// 转化时间到相对时间
function relTime (date) {
  // from中的是 日期 或者  dayjs得到的日期
  // dayjs()当前时间
  // dayjs().from(date) 当前时间距离传入时间有多远
  return dayjs().locale('zh-cn').from(date)
}
