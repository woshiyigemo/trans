import axios from 'axios'
import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource)
const apiConfig = {
    // baseURL: '/cms',
    // baseURL: 'http://heyang.sy.sxurl.cn',
    baseURL: 'http://frontend.sy.sxurl.cn/',
    timeout: 10000,
    withCredentials: true,
    responseType: 'json',
    headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        'content-type': 'application/json;charset=UTF-8',
        // 'Content-Type': 'application/json'
        // 'content-type':'text/html; charset=UTF-8'
        // Content-Type:application/x-www-form-urlencoded
    },
    // proxy: {
    //     host: 'http://heyang.sy.sxurl.cn',
    //     port: 80,
    //     auth:{
    //         username: 'mikeymike',
    //         password: 'rapunz3l'
    //     }
    // },
    validateStatus() {
        return true
    }
}

const apiFunc = axios.create(apiConfig)

function handleError(error) {
    console.error(error)
    return error
}

// 错误统一处理，成功单独处理
function handleStatusCode(response) {
    if (response.status >= 400 && response.status <= 500) {
        alert('出错了')
        return Promise.reject(response)
    }
    return response
}

const api = {
    //  用户登录
    userLogin(data) {
        return apiFunc.post('/user/login', data)
    },
    // 用户注册
    userRegist(data) {
        return apiFunc.post('/user/register', data)
    },
    //  获取图片验证码
    getImgCode(data) {
        return apiFunc.post('/public/getimgcode', data)
    },
    // 验证图片验证码 进入下一步
    checkImgCode(data){
        return apiFunc.post('/user/checkimgcode', data)
    },
    //发送找回密码验证码到邮箱
    sendFindPwdCode(data){
        return apiFunc.post('/user/sendfindpasswordcode', data)
    },
    // 提交找回密码验证码进入下一步
    checkFindPwdCode(data){
        return apiFunc.post('/user/checkfindpasswordcode', data)
    },
    // 找回密码 设置密码提交
    setFindPwdagain(data){
        return apiFunc.post('/user/setfindpasswordagain', data)
    },
    // 新增委托
    addDelegate(data){
        return apiFunc.post('/entrust/order', data)
    },
    // 撤销委托
    cancelDelegate(data){
        return apiFunc.post('/entrust/cancel', data)
    },
    // 当前委托
    curDelegate(data){
        return apiFunc.post('/entrust/current', data)
    },
    // 历史委托
    hisDelegate(data){
        return apiFunc.post('/entrust/history', data)
    },
    // 根据交易ID获取交易明细
    dealDetail(data){
        return apiFunc.post('/entrust/userdetail', data)
    },
    // 委托明细
    delegateDetail(data){
        return apiFunc.post('/entrust/detail', data)
    }
}

const baseUrl = 'http://heyang.sy.sxurl.cn'
// const baseUrl = 'http://wangtao.sy.sxurl.cn'
// const baseUrl = ''
const apitest = {
    login:baseUrl + '/user/login',
    getListDaily: baseUrl + '/query_daily',
    getListHourly:baseUrl + '/query_hourly',
    getFlow:baseUrl + '/query_flow',
    biddingQuery:baseUrl + '/query_bid',
    deviceQuery:baseUrl + '/query_device'
}
function addResource (obj) {
    for (var i = 0, arr = Object.keys(obj), imax = arr.length; i < imax; i++) {
        if (typeof obj[arr[i]] === 'string') {
        obj[arr[i]] = Vue.resource(obj[arr[i]])
        } else if (typeof obj[arr[i]] === 'object') {
        addResource(obj[arr[i]])
        }
    }
}
addResource(apitest)
export {apiFunc, api,apitest, handleError, handleStatusCode}

