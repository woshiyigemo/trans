import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      userInfo:{
        loggedin:false,   //登录状态
        nationality:1,       //默认中国
        id:0,                 //用户id
        name:'',             //用户名
        email:'',            //用户邮箱
        hasSettedPincode:2,   //是否设置了交易密码 1是2否
        authState:1         //认证状态 1未认证 2认证被拒绝 3认证中 4已认证
      }
    },
    mutations: {
      login (state,params){
        state.userInfo.loggedin = true
        state.userInfo.id = params.id || 0
        state.userInfo.nationality = params.nationality || 1
        state.userInfo.name = params.name || ''
        state.userInfo.email = params.email || ''
        state.userInfo.hasSettedPincode  = params.hasSettedPincode
        state.userInfo.authState = params.authState
      },
      logout (state){
        state.userInfo.loggedin = false
        state.userInfo.id = 0
        state.userInfo.nationality =  1
        state.userInfo.name = ''
        state.userInfo.email = ''
        state.userInfo.hasSettedPincode  = 1
        state.userInfo.authState = 1
      },
      completeAuth(state){
        state.userInfo.authState = 3
      }
    },
    getters:{
      loggedIn(state){
        return state.userInfo.loggedin
      },
      username(state){
        return state.userInfo.name
      },
      hasSettedPinCode(state){
        return state.userInfo.hasSettedPincode
      },
      authState(state){
        return state.userInfo.authState
      }
    },
    actions:{
        userLogin({commit},params){
          console.log(21312321321313,params)
            commit('login',params)
        },
        userLogout({commit}){
            commit('logout')
        },
        completeAuth({commit}){
          commit('completeAuth')
        }
    }
  })

  export default store 