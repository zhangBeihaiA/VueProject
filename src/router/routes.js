import Home from '@/views/Home'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Trade from '@/views/Trade'

export default [
    {
        path: '/home',
        component: Home,
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search',
        // props:true
        //对象
        // props:{a:1,b:2}
        //函数写法
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }

    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '*',
        redirect: '/home'
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:'/trade',
        component:Trade,
        meta:{show:true}
    }
]