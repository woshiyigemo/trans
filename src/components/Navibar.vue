<template>
    <div class="index_top_t">
        <div class="logo"></div>
        <div class="nav">
            <router-link to="/">首页</router-link>
            <router-link to="/exchange/coinexchange">币币交易</router-link>
            <!-- <a href="">币币交易</a>
            <a href="">币币交易</a> -->
        </div>
        <div class="login_btn_div">
            <a class="login_btn_div_login" v-if="!user.loggedin" href="javascript:void(0);">登录</a>
            <a class="login_btn_div_register" v-if="!user.loggedin" href="javascript:void(0);">注册</a>
        </div>
    </div>
</template>

<script>
export default {
    name:'Navibar',
    props:{
        
    },
    data(){
        return{
            user:{
                loggedin:true
            },
            btccny:67871.91,
            ethcny:5511.54,
            usdtcny:6.35
        }
    },
    created(){
        
    },
    mounted () {
       
    },
    watch:{
        
    },
    methods:{
        // 获取信息
        getInfo(){

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel='stylesheet/scss' scoped>
.index_top_t{text-align: center;width:100%;min-height:56px;height:auto;background:#202832;overflow:hidden}
.logo{float:left;width:125px;height:56px;background:url('~@/assets//nav-logo.png') no-repeat center;margin-left:80px;}
.nav{width:auto;margin-left:90px;height:56px;min-width:320px;float:left;}
.nav a{float:left;width:auto;margin-right:65px;color:#627482;height:56px;line-height:56px;text-decoration: none;}
.nav a:hover{color:#4c54f9;text-decoration: none;}
.nav_show{color:#4c54f9 !important;}
.login_btn_div{float:right;width:170px;height:56px;padding-top:14px;box-sizing:border-box;margin-right:95px;}
.login_btn_div a{width:80px;height:30px;line-height:30px;border-radius:3px;font-size:12px;display:block;float:left;box-sizing:border-box;}
.login_btn_div_register{background:#4c54f9;color:white;float:right !important;}
.login_btn_div_login{border:1px solid #4c54f9;color:#4c54f9;}
</style>