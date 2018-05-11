import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import VueCookies from 'vue-cookies'
import store from '../store/store'
import {
    Message
    } from 'element-ui'
const expire = 1000 * 60 * 120
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
        // 'Content-Type': 'application/x-www-form-urlencoded'
        // 'content-type':'text/html; charset=UTF-8'
    },
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
    console.log(response.data);
// 对响应数据做点什么
    if(response.data && response.data.error_code && (response.data.error_code == 1000||response.data.error_code == 2014)){
        // 直接返回
        var usinfo = VueCookies.get('__uinfo')
        VueCookies.set('__uinfo',usinfo,new Date().getTime() + expire)
    }else if(response.data && response.data.error_code && response.data.error_code == 2015){
        Message({
            message: '登录超时，请重新登录',
            type: 'error'
        })
        store.dispatch('userLogout')
    }else if(response.data && response.data.error_code && response.data.error_code == 4003){
        // 未设置交易密码
        Message({
            message: '请先设置交易密码，3秒后跳转',
            type: 'error'
        })
        setTimeout(function(){
            router.replace({name:'security'})
        },3000)
        var usinfo = VueCookies.get('__uinfo')
        VueCookies.set('__uinfo',usinfo,new Date().getTime() + expire)
    }else if(response.data && response.data.error_code && response.data.error_code == 4004){
        // 未设置提笔地址
        Message({
            message: '请先设置提币地址，3秒后跳转',
            type: 'error'
        })
        setTimeout(function(){
            router.replace({name:'withdrawaddressmanagement'})
        },3000)
        var usinfo = VueCookies.get('__uinfo')
        VueCookies.set('__uinfo',usinfo,new Date().getTime() + expire)
    }else if(response.status < 200 || response.status >= 300){
        Message({
            message: '网络错误，刷新网页重试',
            type: 'error'
        })
    }else{
        Message({
            message: response.data.error_desc,
            type: 'error'
        })
    }
    response = response.data
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
    // 用户退出
    userLogOut(data) {
        return instance.post('/assets/loginout', data)
    },
    // 用户注册
    userRegist(data) {
        return instance.post('/user/register', data)
    },
    //  获取图片验证码
    getImgCode(type ) {
        return apiConfig.baseURL + '/public/getimgcode?timestamp=' + (new Date().getTime()).toString() + '&type=' + type
    },
    // 验证图片验证码 进入下一步
    checkLoginImgCode(data){
        return instance.post('/user/checkfindpasswordimgcode', data)
    },
    //发送找回密码验证码到邮箱
    sendFindPwdCode(data){
        return instance.post('/user/sendfindpasswordcode', data)
    },
    // 提交找回密码验证码进入下一步
    checkFindPwdCode(data){
        return instance.post('/user/checkfindpasswordcode', data)
    },
    // 修改登录密码
    setSignPwd(data){
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
    orderDetail(data){
        return instance.post('/entrust/userdetail', data)
    },
    // 委托明细
    delegateDetail(data){
        return instance.post('/entrust/detail', data)
    },
    // 公告
    getNotice(data){
        return instance.post('/index/getnotice', data)
    },
    // 资产列表（持有）
    getAssetslist(data){
        return instance.post('/assets/assetslist', data)
    },
    // 用户账户/余额
    userAccount(data){
        return instance.post('/user/account', data)
    },
    // 上传地址
    uploadUrl(){
        return apiConfig.baseURL + '/public/upload'
    },
    // 获取国家
    getCountry(data){
        return instance.post('/public/getcountry', data)
    },
    // 身份验证
    userAuth(data){
        return instance.post('/assets/authentication', data)
    },
    // 设置交易密码
    setPinCode(data){
        return instance.post('/assets/settransactionpassword', data)
    },
    //获取充币地址
    getRechargeAddress(data){
        return instance.post('/assets/rechargeaddress', data)
    },
    //资产中心-财务记录（充币记录）
    assetsRechargeRecord(data){
        return instance.get('/assets/assetsRecord?page=' + data.page)
    },
    //资产中心-财务记录（提取币记录）
    assetsWithdrawRecord(data){
        return instance.get('/assets/assetsWithdraw?page=' + data.page)
    },
    // 提币地址列表
    withdrawAddressList(data){
        return instance.post('/assets/getusertakecoinadresslist', data)
    },
    // 删除提币地址
    deleteWithdrawAddress(data){
        return instance.post('/assets/deletetakecoinaddress', data)
    },
    // 验证交易密码图片验证码
    checkImgCode(data){
        return instance.post('/assets/checkupdatetransactionpasswordimgcode',data)
    },
    // 发送修改交易密码验证码
    getPinCodeVerifyCode(data){
        return instance.post('/assets/sendupdatetransactionpasswordcode', data)
    },
    // 验证修改交易密码验证码
    checkDealCode(data){
        return instance.post('/assets/checkupdatetransactionpasswordcode',data)  
    },
    // 修改交易密码
    modifyDealPwd(data){
        return instance.post('/assets/setupdatetransactionpassword',data)
    },
    // 发送提币验证邮件
    getTakeCoinVerifyCode(data){
        return instance.post('/assets/sendaddtakecoinaddressemail', data)
    },
    // 添加提币地址
    addWithdrawAddress(data){
        return instance.post('/assets/addtakecoinaddress', data)
    },
    //获取提币地址
    getWithdrawAddress(data){
        return instance.post('/assets/gettakecoinaddress', data)
    },
    //提币手续费接口
    calWithdrawFee(data){
        return instance.post('/assets/getpoundage', data)
    },
    sendWithdrawCode(data){
        return instance.post('/assets/sendtakecoinemail', data)
    },
    //提币按钮
    withdrawCoin(data){
        return instance.post('/assets/takecoin', data)
    },
    //获取公告列表
    GetNoticeList(data){
        return instance.post('/index/getnotice', data)
    },
    //获取公告详情
    GetNoticeDetail(data){
        return instance.post('/index/getnoticedetail', data)
    },
    getWsByCurrency(data){
        var  arr = Object.keys(data),str = ''
        for(var i in arr){
            str+= ('&'+ arr[i] +'=')
            str+= data[arr[i]]
        }
        str = '?' + str.substr(1)
        return instance.get('/Port/getPort'+str)
    },
    //添加阅读量
    SetNoticeReadingCount(data){
        return instance.post('/public/setnoticereadingcount', data)
    },
    getAddress(data){
        return instance.post('/assets/getAddress', data)
    },
}
export {api, handleError, handleStatusCode}

