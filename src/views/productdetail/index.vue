<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(image, index) in goodsDetail.goods_images" :key="index">
        <img :src="image.external_url" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ goodsDetail.goods_images?.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ goodsDetail.goods_price_min }}</span>
          <span class="oldprice">￥{{ goodsDetail.line_price_min }}</span>
        </div>
        <div class="sellcount">已售{{ goodsDetail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ goodsDetail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ commentList.length }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <img :src="getAvatarUrl(item)" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :model-value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="goodsDetail.content">
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="icon-cart">
        <span v-if="cartTotal > 0" class="num">{{ cartTotal }}</span>
        <van-icon name="shopping-cart-o" />
        <span>购物车</span>
      </div>
      <div @click="addFn" class="btn-add">加入购物车</div>
      <div @click="buyFn" class="btn-buy">立刻购买</div>
    </div>

    <van-action-sheet v-model:show="showCart" :title="mode === 'cart' ? '加入购物车' : '立刻购买'">
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="goodsDetail.goods_image" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ goodsDetail.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ goodsDetail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <CountBox v-model="count" :max="goodsDetail.stock_total" />
        </div>
        <div class="showbtn" v-if="goodsDetail.stock_total > 0">
          <div  @click="handleCartAndBuy" class="btn" v-if="mode === 'cart'">加入购物车</div>
          <div  @click="handleCartAndBuy" class="btn now" v-else>立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGoodsDetail, getGoodsComment } from '@/api/product'
import CountBox from '@/components/CountBox.vue'
import store from '@/store'
import { addCart as addCartApi, getCartList } from '@/api/cart'

const route = useRoute()
const router = useRouter()
const goodsId = computed(() => route.query.id)

const goodsDetail = ref({})
const commentList = ref([])
const current = ref(0)
const showCart = ref(false)
const mode = ref('cart')
const count = ref(1)
const cartTotal = ref(0)


const defaultAvatar = new URL('@/assets/default-avatar.png', import.meta.url).href

const addFn = () => {
  mode.value = 'cart'
  showCart.value = true
}

const buyFn = () => {
  mode.value = 'buy'
  showCart.value = true
}

const handleCartAndBuy = async () => {
  if (!store.getters.token) {
    showConfirmDialog({
      title: '温馨提示',
      message: '此时需要先登录才能继续操作哦',
      confirmButtonText: '去登录',
      cancelButtonText: '再逛逛'
    })
      .then(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: route.fullPath
          }
        })
      })
      .catch(() => {})
    return
  }

  try {
    const res = await addCartApi(goodsId.value, count.value, goodsDetail.value.skuList[0].goods_sku_id)
    cartTotal.value = res.data.cartTotal
    showCart.value = false
    showToast('加入购物车成功')
  } catch (error) {
    console.error('加入购物车失败:', error)
  }
}


  const getAvatarUrl = (item) => {
  if (item.user.avatar?.external_url) {
    return item.user.avatar.external_url
  }
  if (item.user.avatar_url) {
    return item.user.avatar_url
  }
  return defaultAvatar
}

const getDetailData = async () => {
  try {
    const res = await getGoodsDetail(goodsId.value)
    goodsDetail.value = res.data.detail
  } catch (error) {
    console.error('获取商品详情失败:', error)
  }
}

const getCommentData = async () => {
  try {
    const res = await getGoodsComment(goodsId.value, 3)
    commentList.value = res.data.list.data
  } catch (error) {
    console.error('获取商品评论失败:', error)
  }
}

const onChange = (index) => {
  current.value = index
}

const getCartTotalData = async () => {
  try {
    const res = await getCartList()
    cartTotal.value = res.data.cartTotal
  } catch (error) {
    console.error('获取购物车数量失败:', error)
  }
}

onMounted(() => {
  getDetailData()
  getCommentData()
  getCartTotalData()
})
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100%!important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}

.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}

.footer .icon-cart {
  position: relative;
  padding: 0 6px;
  .num {
    z-index: 999;
    position: absolute;
    top: -2px;
    right: 0;
    min-width: 16px;
    padding: 0 4px;
    color: #fff;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 50%;
  }
}
</style>