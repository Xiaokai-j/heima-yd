/****
 *request.js 负责请求管理工具
 *
 * ***/
import axios from 'axios'
// 处理大数字 引入jsonbig 大数字插件
import JSONBig from 'json-bigint'

// 引入vuex中的store 实例对象 相当于 组件中的this.$store
import store from '@/store'

// 创建一个axios实例 和原来的axios没有关系
// instance 一个新的实例
// axios.create() 相当于new 一个新的实例
const instance = axios.create({
  // 构造函数 传入 一些 配置 和 defaults一样
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 设置请求地址常量
  // 次函数是后台响应回来 但是还没进入到axios的响应拦截器时执行 数组里面可以写多个处理函数
  transformResponse: [function (data) {
    //   data就是后端响应的字符串 默认的转化是 JSON.parse 处理大数字是有问题的额 需要用JSONBIG替换
    // 第一种方式
    // return data ? JSONBig.parse(data) : {}
    // 第二种方式
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})
// token 的注入应该在请求之前写  请求拦截器
// instance 是一个 axios 实例
instance.interceptors.request.use(function (config) {
  // 成功的时候如何处理
  // 读取配置信息 给配置信息注入token
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}` // 统一注入token
  }
  return config // 返回配置
}, function (error) {
  // 直接返回 promise 的错误
  return Promise.reject(error) // 返回错误 这样的话直接进入到axios的catch
})

// 用响应拦截器 处理 返回结果的数据 将多嵌套的结构 解构出来
// 响应拦截器
instance.interceptors.response.user(function (response) {
  //    得到的response实际上被axios包 一层数据
  try {
    //   将数据解构
    return response.data.data
  } catch (error) {
    return response.data
  }
}, function (error) {
  return Promise.reject(error)
})
export default instance
