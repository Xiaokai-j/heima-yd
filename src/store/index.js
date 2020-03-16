/****
 *store 下的index.js 专门处理 vuex 中的模块
 *vuex 在 state 共享状态
 * *****/
import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 专门来放置需要共享的状态
    user: auth.getUser // 就是我们的token信息的对象
  },
  mutations: {
    // 修改token
    updateUser (state, payload) {
      // 定义载荷中的token 数据给state
      state.user = payload.user
      // 更新vuex的时候 也应该 将最新的数据 存入本地缓存
      auth.setUser(payload.user) // 相当于保存vuex 和本地存储的同步
    },
    // 删除token
    delUser (state) {
      state.user = {}// 将vuex中的token设置为空对象
      // 缓存数据也需要更新
      auth.delUser()// 删除本地缓存的token
    }
  },
  actions: {
  },
  modules: {
  }
})
