vue
<template>
  <div>
    <van-nav-bar title="首页" />
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'HomeIndex',
  setup () {
    const title = ref('首页')
    return {
      title
    }
  }
}
</script>
<style scoped>
</style>
