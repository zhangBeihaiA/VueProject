//对axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
// console.log(nprogress)
//引入进度条样式
import "nprogress/nprogress.css"
import store from '@/store'

//利用axios对象的create方法，去创建一个axios实例
const requests = axios.create({
    //配置对象
    baseURL: '/api',
    timeout: 5000
})

//请求拦截器
requests.interceptors.request.use((config) => {
    if(store.state.detail.USERID){
        config.headers.userTempId = store.state.detail.USERID
    }
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
}, (error) => {
    return Promise.reject(new Error('faile'))
})

export default requests
