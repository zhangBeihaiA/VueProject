import { reqAddressInfo,reqOrderInfo } from "@/api"

const state = {
    address: [],
    orderInfo:{}
}

const mutations = {
    GETUSERADDERSS(state,address) {
        state.address = address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}

const actions = {
    //获取用户地址信息
    async getUseraddress({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit('GETUSERADDERSS', result.data)
            console.log(result)
        }
    },
    //获取商品清单信息
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code ==200){
            commit('GETORDERINFO',result.data)
        }
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}