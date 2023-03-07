import Vue from 'vue'
import App from './App.vue'
//引入路由器
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//三级联动注册为全局组件
//分页器注册为全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//测试
// import {reCategoryList} from '@/api'
// reCategoryList()
//引入仓库
import store from '@/store'

Vue.config.productionTip = false
//引入mockServe
import '@/mock/mockServe'
//引入Swiper样式
import "swiper/css/swiper.min.css";


new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  //注册路由
  router,
  store
}).$mount('#app')
