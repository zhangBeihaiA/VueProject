import { reqCategoryList, reqGetBannerList, reqGetFloorList, reqGetQinghua } from '@/api'
//home模块的小仓库
const state = {
    qinghua: '',
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor的数据
    floorList: []
}
//mutation是修改state的唯一方法
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    //修改state一定要注入state，传入bannerlist
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
        // console.log("在修改仓库中的bannerList数据")
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    },
    GETQINGHUA(state, qinghua) {
        state.qinghua = qinghua
    }

}
const actions = {
    //获取情话
    async GetQinghua({ commit }) {
        let result = await reqGetQinghua()
        if (result.code == 1) {
            commit('GETQINGHUA', result.content)
            console.log(result)
        }
    },
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        // console.log("在向服务器发送ajax请求，获取轮播图的数据")
        let result = await reqGetBannerList();
        // console.log(result)
        if (result.code == 200) {
            //提交的是谁？GETBANNERLIST，提交的是什么？result.data
            commit('GETBANNERLIST', result.data)
        }

    },
    //获取floor数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList()
        // console.log(result)
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }

    },


}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
