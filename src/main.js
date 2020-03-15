import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件库
import Vant from 'vant'
// 引入vant组件 样式
import 'vant/lib/index.css'
//
import 'amfe-flexible'
Vue.config.productionTip = false
Vue.use(Vant) // 全局注册  实际上调用了 Vant导出的对象的方法  install方法
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
