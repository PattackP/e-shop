/* 封装axios用于发送请求 */
import axios from 'axios'

const request = axios.create({
    baseURL: 'http://smart-shop.itheima.net/index.php?s=/api/',
    timeout: 5000
})

request.interceptors.request.use(function (config) {
    config.headers.platform = 'H5'
    config.headers['Content-Type'] = 'application/json'
    if (config.data && typeof config.data === 'object') {
        config.data = JSON.stringify(config.data)
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return Promise.reject(error)
})

export default request