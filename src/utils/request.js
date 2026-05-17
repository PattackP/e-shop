/* 封装axios用于发送请求 */
import axios from 'axios'
import store from '@/store'


const request = axios.create({
    baseURL: 'http://smart-shop.itheima.net/index.php?s=/api/',
    timeout: 5000
})

request.interceptors.request.use(function (config) {
    // 从vuex中获取token
    const token = store.getters.token
    if (token) {
        config.headers['Access-Token'] = token
    }
    
    config.headers['Content-Type'] = 'application/json'
    config.headers['platform'] = 'H5'
    if (config.data && typeof config.data === 'object') {
        config.data = JSON.stringify(config.data)
    }
    showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
    });
    return config
}, function (error) {
    return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
    const res = response.data
    closeToast()
    if (res.status !== 200) {
        showToast(res.message || '请求失败')
        return Promise.reject(new Error(res.message || '请求失败'))
    }
    return res
}, function (error) {
    closeToast()
    showToast(error.message || '网络异常，请稍后再试')
    return Promise.reject(error)
})

export default request