import { reqGetSearchInfo } from '@/api'

const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
    async getSearchList({commit},searchParams) {
        let result = await reqGetSearchInfo(searchParams)
        // console.log(result)
        if(result.code==200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
//计算属性 简化数据而生
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(){
        return  state.searchList.trademarkList || []
    },
    attrsList(){
        return state.searchList.attrsList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}