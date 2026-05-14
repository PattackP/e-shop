/* 封装axios用于发送请求 */
import axios from 'axios'
import { showToast } from 'vant'

const request = axios.create({
    baseURL: 'http://smart-shop.itheima.net/index.php?s=/api/',
    timeout: 5000
})

request.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/json'
    if (config.data && typeof config.data === 'object') {
        config.data = JSON.stringify(config.data)
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
    const res = response.data
    // 判断请求是否成功
    if (res.status !== 200) {
        // 请求失败，显示错误提示
        showToast(res.message)
        return Promise.reject(new Error(res.message))
    }
    // 请求成功，直接返回数据
    return res
}, function (error) {
    // 网络错误等
    showToast(error.message || '请求失败')
    return Promise.reject(error)
})

export default request