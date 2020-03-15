import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 用按需加载的方式配置路由
const Layout = () => import('@/views/layout') // 按需引入layout
const home = () => import('@/views/home') // 按需引入home 二级路由
const question = () => import('@/views/question') // 按需引入question 二级路由
const video = () => import('@/views/video') // 按需引入video  二级路由
const user = () => import('@/views/user') // 按需引入user 二级路由
// 其他的一级路由
const chat = () => import('@/views/user/chat') // 小智同学
const login = () => import('@/views/login') // 登录模式
const profile = () => import('@/views/user/profile') // 编辑资料
const search = () => import('@/views/search') // 搜索中心
const searchresult = () => import('@/views/search/result') // 搜索结果
const article = () => import('@/views/article') // 文章中心

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout, // 布局组件 一级路由
    children: [
      {
        path: '',
        component: home
      },
      {
        // 问答组件
        path: '/question',
        component: question
      }, {
        // 视频组件
        path: '/video',
        component: video
      }, {
        path: '/user',
        component: user
      }]
  }, {
    // 一级路由 小智同学
    path: '/user/chat',
    component: chat
  }, {
    // 一级路由 登录
    path: '/login',
    component: login
  }, {
    // 一级路由编辑资料
    path: '/user/profile',
    component: profile
  }, {
    // 一级路由搜索中心
    path: '/search',
    component: search
  }, {
    path: '/search/result',
    component: searchresult
  }, {
    // 一级路由 文章详情
    path: '/article',
    component: article
  }, {
    path: '/article',
    component: article
  }

]

const router = new VueRouter({
  routes
})

export default router
