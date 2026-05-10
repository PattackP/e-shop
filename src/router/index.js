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
    }
  ]
})

export default router
