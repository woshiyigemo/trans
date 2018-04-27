// 正则
const reg = {
    emailReg:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
    pwdReg:/\d{1,6}/
}
// 国际
const nationalityOption = [
    {
        label:'外国',
        value:0
    },
    {
        label:'中国',
        value:1
    }
]
// 错误处理
const ERR = {
    NOERR:1000,     //没错误
    // 登录
    EMAILERR:1001,  //邮箱格式错误
    PWDERR:1002,    //密码必须为2-6位数字
    PWD2ERR:1003,   //重复密码必须为2-6位数字
    NATIONALITYERR:1004,   //国籍错误
    PWDNOTSAME:1005,    //两次密码不同
    SLIDERERR:1010, //滑块验证

    // 实名认证
    FULLNAMEEMPTY:2000,     //全名为空
    CODEEMPTY:2001,          //证件号为空
    NOFACEIMG:2002,            //缺少证件照正面
    NOBACKIMG:2003,           //缺少证件照背面
    NOBODYIMG:2004            //缺少手持证件照        
}


const Validate = {
    // 登录验证
    login:function(email,pwd,sliderStatus){
        var res = {}
        if(!reg.emailReg.test(email)){
            res.errCode = ERR.EMAILERR
            res.errMsg = '邮箱格式错误'
        }else if(!reg.pwdReg.test(pwd)){
            res.errCode = ERR.PWDERR
            res.errMsg = '密码必须为2-6位数字'
        }else if(!sliderStatus){
            res.errCode = ERR.SLIDERERR
            res.errMsg = '请进行滑块验证'
        }else if(reg.emailReg.test(email) && reg.pwdReg.test(pwd) && sliderStatus){
            res.errCode = ERR.NOERR
            res.errMsg = '校验合法'
        }
        return res
    },
    // 注册验证
    regist:function(email,pwd,pwd2,nationality,sliderStatus){
        var res = {}
        if(!reg.emailReg.test(email)){
            res.errCode = ERR.EMAILERR,
            res.errMsg = '邮箱格式错误'
        }else if(!reg.pwdReg.test(pwd) ){
            res.errCode = ERR.PWDERR,
            res.errMsg = '密码必须为2-6位数字'
        }else if(!reg.pwdReg.test(pwd2)){
            res.errCode = ERR.PWD2ERR,
            res.errMsg = '密码必须为2-6位数字'
        }else if(typeof nationality == undefined || nationality == ''){
            res.errCode = ERR.NATIONALITYERR
            res.errMsg = '国籍非法'
        }else if(pwd != pwd2){
            res.errCode = ERR.PWDNOTSAME
            res.errMsg = '两次密码不同'
        }else if(!sliderStatus){
            res.errCode = ERR.SLIDERERR
            res.errMsg = '滑块验证失败'
        }else {
            res.errCode =  ERR.NOERR
            res.errMsg = '校验合法'
        }
        return res
    },
    // 实名认证step1
    idVerify(name,number,faceimg,backimg,bodyimg){
        var res = {}
        if(!name.length || name.length == 0){
            res.errCode =  ERR.FULLNAMEEMPTY
            res.errMsg = '请填写全名'
        }else if(!number.length || number.length == 0){
            res.errCode =  ERR.FULLNAMEEMPTY
            res.errMsg = '请填写证件号'
        }else if(!faceimg || faceimg == ''){
            res.errCode =  ERR.NOFACEIMG
            res.errMsg = '请上传证件正面照片'
        }else if(!backimg || backimg == ''){
            res.errCode =  ERR.NOBACKIMG
            res.errMsg = '请上传证件反面照片'
        }else if(!bodyimg || bodyimg == ''){
            res.errCode =  ERR.NOBODYIMG
            res.errMsg = '请上传手持证件照片'
        }else{
            res.errCode =  ERR.NOERR
            res.errMsg = '校验合法'
        }
        return res
    }
}

export { Validate,ERR ,nationalityOption}