import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Login from '@/views/login/index.vue'
import MyOrder from '@/views/myorder/index.vue'
import Pay from '@/views/pay/index.vue'
import ProductDetail from '@/views/productdetail/index.vue'
import Search from '@/views/search/index.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import Category from '@/views/layout/category.vue'
import Home from '@/views/layout/home.vue'
import { getUserInfo } from '@/utils/localStorage'
import store from '@/store'
import SearchList from '@/views/search/list.vue'



// 需要鉴权的路由
const authRoutes = ['/myorder', '/pay']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/category',
          name: 'Category',
          component: Category
        },
        {
          path: '/user',
          name: 'User',
          component: User
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/myorder',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/productdetail',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/searchList',
      name: 'SearchList',
      component: SearchList
    }
  ]
})

// 全局前置守卫 - 鉴权
router.beforeEach((to, from) => {
  // 检查目标路由是否需要鉴权
  if (authRoutes.includes(to.path)) {
    // 从 localStorage 获取用户信息
    const token = store.getters.token
   
    // 检查 token 是否存在
    if (!token) {
      // token 不存在，重定向到登录页
      return { path: '/login', query: { redirect: to.fullPath } }
    }
  }
  // 其他路由放行
  return true
})

export default router