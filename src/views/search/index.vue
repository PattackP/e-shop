<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search show-action v-model="keyword"  placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div  @click="goSearch(keyword)" @keyup.enter="goSearch(keyword)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="clearHistory" />
      </div>
      <div class="list" v-if="searchHistory.length > 0">
        <div class="list-item" v-for="item in searchHistory" :key="item" @click="goSearch(item)">{{ item }}</div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setSearchHistory, getSearchHistory } from '@/utils/localStorage'

const searchHistory = ref(getSearchHistory())
const keyword = ref('')

const router = useRouter()

const goSearch = (item) => {
  if (!item) {
    showToast('请输入搜索关键词')
    return
  }
  const index = searchHistory.value.indexOf(item)
  if (index !== -1) {
    searchHistory.value.splice(index, 1)
  }
  searchHistory.value.unshift(item)
  keyword.value = ''
  setSearchHistory(searchHistory.value)
  router.push({ name: 'SearchList', query: { keyword: item } })
}

const clearHistory = () => {
    searchHistory.value = []
    setSearchHistory(searchHistory.value)
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>