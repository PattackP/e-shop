<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :model-value="keyword"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in goodsList" :key="item.goodsId" :goods="item"></GoodsItem>
    </div>
  </div>
</template>

<script setup>
import GoodsItem from '@/components/GoodsItem.vue'
import { useRoute } from 'vue-router'
import { getProductList as getProductListApi } from '@/api/product'
import { ref, watch } from 'vue'



const route = useRoute()
//vant4 绑定:value值用:model-value
const keyword = ref(route.query.keyword || '')
const goodsList = ref([])



const getProductList = async () => {
  try {
    let obj = {
      goodsName: keyword.value,
      page: "1",
      categoryId: route.query.categoryId
    }
    const res = await getProductListApi(obj)
    goodsList.value = res.data.list.data
  } catch (error) {
    console.error('获取商品列表失败:', error)
  }
}
getProductList()
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>