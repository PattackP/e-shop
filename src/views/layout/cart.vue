<template>
  <div>
    <van-nav-bar title="购物车" />
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'ShoppingIndex',
  setup () {
    const title = ref('购物车')
    return {
      title
    }
  }
}
</script>
<style scoped>
</style>
