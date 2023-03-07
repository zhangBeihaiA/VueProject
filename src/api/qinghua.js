//对axios进行二次封装
import axios from 'axios'
//引入进度条
// import nprogress from 'nprogress'
// console.log(nprogress)
//引入进度条样式
import "nprogress/nprogress.css"

//利用axios对象的create方法，去创建一个axios实例
const qinghua = axios.create({
    //配置对象
    baseURL: 'https://api.uomg.com/api',
    timeout: 5000
})

//请求拦截器
qinghua.interceptors.request.use((config) => {
    // nprogress.start()
    return config
})

//响应拦截器
qinghua.interceptors.response.use((res) => {
    // nprogress.done()
    return res.data
}, (error) => {
    return Promise.reject(new Error('faile'))
})

export default qinghua
