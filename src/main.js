import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件库
// 导入lazyload，注册，实现图片懒加载。
import Vant, { Lazyload } from 'vant'
// 引入vant组件 样式
import 'vant/lib/index.less'
// 引入
import 'amfe-flexible'
// 引入less样式
import '@/styles/index.less'

// 注册好了 支持v-lazy指令
Vue.use(Lazyload)

Vue.config.productionTip = false
Vue.use(Vant) // 全局注册  实际上调用了 Vant导出的对象的方法  install方法
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
