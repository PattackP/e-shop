import request from '@/utils/request'

export const getProductDetail = (goodsId) => {
    return request.get('/product/detail', {
        params: { id: goodsId }
    })
}

export const getProductList = (obj) => {
    const { categoryId,goodsName,page } = obj
    return request.get('/goods/list', {
        params: {
            categoryId,
            goodsName,
            page
        }
    })
}

export const getGoodsDetail = (goodsId) => {
    return request.get('/goods/detail', {
        params: { goodsId: goodsId }
    })
}

export const getGoodsComment = (goodsId, limit) => {
    return request.get('/comment/list', {
        params: { goodsId: goodsId, limit: limit }
    })
}