<template>
  <div>
    <van-nav-bar title="我的" />
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'UserIndex',
  setup () {
    const title = ref('我的')
    return {
      title
    }
  }
}
</script>
<style scoped>
</style>
