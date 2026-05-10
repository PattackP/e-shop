<template>
  <router-view/>
  <van-tabbar route active-color="#ee0a24">
    <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const active = ref(0)

const map = {
  '/home': 0,
  '/category': 1,
  '/cart': 2,
  '/user': 3
}

// 监听路由变化，实时更新 Tabbar 高亮状态
watch(
  // 第一个参数：要监听的数据源（函数形式，监听 route.path 的变化）
  () => route.path,
  // 第二个参数：回调函数，当 route.path 变化时执行
  (path) => {
    // 根据路径更新 active 值，如果找不到对应路径则默认 0
    active.value = map[path] ?? 0
  },
  // 第三个参数：配置选项
  // immediate: true 表示立即执行一次（组件创建时就执行，用于初始化高亮）
  { immediate: true }
)
</script>
