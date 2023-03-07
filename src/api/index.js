//API进行统一管理
//http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList  get 无参数
import requests from './ajax'
import mockRequests from './mockAjax'
import qinghua from './qinghua'
//获取土味情话
export const reqGetQinghua = () => {
    return qinghua({ url: '/rand.qinghua', method: "get" },)
}

export const reqCategoryList = () => {
    //发请求 axios发请求返回的是promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}
// export const reqCategoryList  = ()=> requests.get('/baner')
export const reqGetBannerList = () => {
    return mockRequests.get('/banner')
}

//获取floor数据--对外暴露一个函数，返回的是promise实例
export const reqGetFloorList = () => {
    return mockRequests.get('/floor')
}

//获取搜索模块的数据 地址：/api/list 方式:post 需要带参数
export const reqGetSearchInfo = (data) => requests({ url: "/list", method: "post", data })
//export const reqSearchList = (data)=>requests({url:'/list',method:'post',data})

//获取商品详情的参数  /api/item/{ skuId }
export const reqGetGoodInfo = (skuId) => {
    return requests({ url: `/item/${skuId}`, method: 'get' })
}

//把商品信息和商品数量发送给服务器  /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuID, skuNum) => requests({ url: `/cart/addToCart/${skuID}/${skuNum}`, method: 'post' })

//获取购物车列表信息  /api/cart/cartList
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车商品 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
})

//请求商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedByid = (skuID,isChecked) => requests({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: 'get' })
//获取验证码           /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
// export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

//注册账号 /api/user/passport/register   post
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',method:'post',data})

//登录接口  /api/user/passport/login  post/ phone password
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',method:'post',data})
//获取用户信息 /api/user/passport/auth/getUserInfo
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})
//退出登录  /api/user/passport/logout  get
export const reqLoginOut = ()=>requests({url:'/user/passport/logout',method:'get'})
//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
//获取商品信息 /api/order/auth/trade
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})



