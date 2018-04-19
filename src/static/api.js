import Vue from 'vue'
import axios from 'axios'
import router from '../router'

const apiConfig = {
    // baseURL: '/cms',
    // baseURL: 'http://heyang.sy.sxurl.cn',
    baseURL: 'http://frontend.sy.sxurl.cn/',
    timeout: 10000,
    withCredentials: true,
    responseType: 'json',
    headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8'
        // 'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded'
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

const instance = axios.create(apiConfig)
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
// 对响应数据做点什么
    if(response.data && response.data.error_code && (response.data.error_code != 1000 && response.data.error_code != 2014)){
        router.push({name:'login'})
        console.log(1111)
    }else if(response.data){
        console.log(22222)
        response = response.data
    }else{
        console.log(3333)
    }
return response;
}, function (error) {
// 对响应错误做点什么
    return Promise.reject(error);
});

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
        return instance.post('/user/login', data)
    },
    // 用户注册
    userRegist(data) {
        return instance.post('/user/register', data)
    },
    //  获取图片验证码
    getImgCode(data) {
        return instance.post('/public/getimgcode', data)
    },
    // 验证图片验证码 进入下一步
    checkImgCode(data){
        return instance.post('/user/checkimgcode', data)
    },
    //发送找回密码验证码到邮箱
    sendFindPwdCode(data){
        return instance.post('/user/sendfindpasswordcode', data)
    },
    // 提交找回密码验证码进入下一步
    checkFindPwdCode(data){
        return instance.post('/user/checkfindpasswordcode', data)
    },
    // 找回密码 设置密码提交
    setFindPwdagain(data){
        return instance.post('/user/setfindpasswordagain', data)
    },
    // 新增委托
    addDelegate(data){
        return instance.post('/entrust/order', data)
    },
    // 撤销委托
    cancelDelegate(data){
        return instance.post('/entrust/cancel', data)
    },
    // 当前委托
    curDelegate(data){
        return instance.post('/entrust/current', data)
    },
    // 历史委托
    hisDelegate(data){
        return instance.post('/entrust/history', data)
    },
    // 根据交易ID获取交易明细
    dealDetail(data){
        return instance.post('/entrust/userdetail', data)
    },
    // 委托明细
    delegateDetail(data){
        return instance.post('/entrust/detail', data)
    }
}
export {api, handleError, handleStatusCode}

