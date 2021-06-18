import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')
const Users = () => import('../views/users/Users.vue')
const Roles = () => import('../views/rights/Role.vue')
const RightsList = () => import('../views/rights/RightsList.vue')
const GoodsList = () => import('../views/goodsManage/GoodsList.vue')
const CategoryParams = () => import('../views/goodsManage/CategoryParams.vue')
const GoodsCategory = () => import('../views/goodsManage/GoodsCategory.vue')
const OrderList = () => import('../views/orderManage/OrderList.vue')
const DataShow = () => import('../views/dataManage/DataShow.vue')
const Welcome = () => import('../views/Welcome.vue')
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
    component: Home,
    redirect: '/home/welcome',
    children: [
      {
        path: '/home/welcome',
        name: 'Welcome',
        component: Welcome
      },
      {
        path: '/users',
        name: 'Users',
        component: Users
      },
      {
        path: '/roles',
        name: 'Roles',
        component: Roles
      },
      {
        path: '/rights',
        name: 'RightsList',
        component: RightsList
      },
      {
        path: '/goods',
        name: 'GoodsList',
        component: GoodsList
      },
      {
        path: '/params',
        name: 'CategoryParams',
        component: CategoryParams
      },
      {
        path: '/categories',
        name: 'GoodsCategory',
        component: GoodsCategory
      },
      {
        path: '/orders',
        name: 'OrderList',
        component: OrderList
      },
      {
        path: '/reports',
        name: 'DataShow',
        component: DataShow
      }
    ]
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
  // console.log(store.state.userInfo)
  // const tokenStr = store.state.userInfo
  const tokenStr = window.localStorage.getItem('userInfoToken')
  if (!tokenStr) return next('/login')
  next()
})

export default router
