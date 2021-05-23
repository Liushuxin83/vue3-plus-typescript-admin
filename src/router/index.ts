import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store/index'
const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  // 通配符匹配
  {
    path: '/:catchAll(.*)',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 如果用户没有登录，但是直接通过URL访问特定页面，需要重新导航到登录页面
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token   null
  console.log(store.state.userInfo)
  const tokenStr = store.state.userInfo
  if (!tokenStr) return next('/login')
  next()
})

export default router
