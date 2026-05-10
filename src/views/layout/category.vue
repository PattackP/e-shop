<template>
  <div>
    <van-nav-bar title="分类页" />
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'CategoryIndex',
  setup () {
    const title = ref('分类页')
    return {
      title
    }
  }
}
</script>
<style scoped>
</style>
