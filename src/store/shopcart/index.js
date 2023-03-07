import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api'
import { reqAddOrUpdateShopCart } from '@/api'

const state = {
    cartList: []
}

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    async getCartList({ commit }) {
        const result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
            console.log("这是shopcart仓库getCartList")
            // console.log(result)

        }
    },
    // async addOrUpdateShopCart({ commit }, { skuID, skuNum }) {
    //     let result = await reqAddOrUpdateShopCart(skuID, skuNum)
    //     if (result.code == 200) {
    //         // console.log(result)
    //         return "ok"

    //     } else {
    //         return Promise.reject(new Error("faile"))
    //     }

    // }
    //删除商品
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            console.log("删除商品请求")
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    ////修改商品选中状态 
    async updateCheckedByid({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked)
        if (result.code == 200) {
            console.log(result)
        } else {
            Promise.reject(new Error('不对劲！！！'))
        }
    },
    //删除所有选中的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
           let promise = item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : ''
           PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },
    //修改全部商品的状态
     updataAllCartIsChecked({dispatch,state},isChecked){
         let promiseAll = []
         state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedByid',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
         })
         
         return Promise.all(promiseAll)
    }

}
//计算属性 简化数据而生
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },

}
export default {
    state,
    mutations,
    actions,
    getters
}