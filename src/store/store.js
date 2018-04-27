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
        email:''            //用户邮箱
      }
    },
    mutations: {
      login (state,params){
        state.userInfo.loggedin = true
        state.userInfo.id = params.id || 0
        state.userInfo.nationality = params.nationality || 1
        state.userInfo.name = params.name || ''
        state.userInfo.email = params.email || ''
      },
      logout (state){
        state.userInfo.loggedin = false
        state.userInfo.id = 0
        state.userInfo.nationality =  1
        state.userInfo.name = ''
        state.userInfo.email = ''
      }
    },
    actions:{
        userLogin({commit},params){
          console.log(21312321321313,params)
            commit('login',params)
        },
        userLogout({commit}){
            commit('logout')
        }
    }
  })

  export default store 