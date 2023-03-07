//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//使用插件
Vue.use(VueRouter)
//引入store
import store from '@/store'

let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { y: 0 }
  }
})
//全局守卫，前置守卫
router.beforeEach(async (to, from, next) => {
  next()
  //用户登录才会有token
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    //用户登录了还想去login
    if (to.path == '/login') {
      next('/')
      console.log(111)
    } else {
      //如果用户名已有
      if (name) {
        next()
        console.log(222)
      } else {
        try {
          //登录了没有用户信息
          //获取用户名
          await store.dispatch('getUserInfo')
          //再放行
          next()
          console.log(333)
        } catch (error) {
          //token失效了
          //清除token
          await store.dispatch('userLoginOut')
          next('/login')
          


        }
      }

    }
  } else {
    next()
    console.log(444)
  }
})


export default router