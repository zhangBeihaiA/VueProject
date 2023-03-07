import { reqGetGoodInfo } from '@/api'
import { reqAddOrUpdateShopCart } from '@/api'
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    USERID:getUUID()
}

const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}

const actions = {
    async getGoodInfo({ commit }, goodId) {
        let result = await reqGetGoodInfo(goodId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    //向服务器发送商品信息和购买数量
    //加入购物车||将来修改商品个数的地方,右侧是载荷对象【两个K,两个V】
    async addOrUpdateShopCart({ commit }, { skuID, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuID,skuNum)
        if(result.code == 200){
            console.log("detail仓库发请求")
            return "ok"

        }else{
            return Promise.reject(new Error("faile"))
        }

    }
}

const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}