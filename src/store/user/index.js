import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLoginOut } from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'

const state = {
    code: '',
    token:getToken(),
    userInfo:{}
}

const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    //清除本地数据
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
    
}

const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            console.log(result)
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }

    },
    //用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code==200){
            return "OK"
        }else{
            return Promise.reject(new Error("注册失败"))
        }
    },
    //登录业务
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        console.log(result)
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            //持久化存储token
            setToken(result.data.token)
            // console.log("正在登录获取token")
            return "ok"
        }else{
            return Promise.reject(new Error('登录失败'))
        }

    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            console.log("获取用户信息")
            return "ok"
        }else{
            return Promise.reject(new Error('获取用户信息请求失败！'))
        }
    },

    //退出登录
    async userLoginOut({commit}){
        let result = await reqLoginOut()
        if(result.code==200){
            commit('CLEAR')
            return "ok"
        }else{
            return Promise.reject(new Error('退出登录失败！'))
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