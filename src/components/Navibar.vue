<template>
    <div class="index_top_t">
        <div class="logo"></div>
        <div class="nav">
            <router-link class="navbar" active-class="navbar-active" to="/home">首页</router-link>
            <router-link class="navbar" active-class="navbar-active" to="/exchange/coinexchange">币币交易</router-link>
            <!-- <a href="">币币交易</a>
            <a href="">币币交易</a> -->
        </div>
        <div class="login_btn_div"  v-if="!userloggedin">
            <router-link class="login_btn_div_login" to="/user/login">登录</router-link>
            <router-link class="login_btn_div_register" to="/user/regist">注册</router-link>
        </div>
        <div class="person-nav-wrapper"  v-if="userloggedin">
            <router-link class="person-nav" active-class="person-nav-active" to="/order">订单</router-link>
            <router-link class="person-nav" active-class="person-nav-active" to="/account/security">用户：{{username}}</router-link>
            <router-link class="person-nav" active-class="person-nav-active" to="/property/coinoption">资产</router-link>
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
                loggedin:false
            },
            btccny:67871.91,
            ethcny:5511.54,
            usdtcny:6.35
        }
    },
    computed:{
        userloggedin(){
            return this.$store.getters.loggedIn
        },
        username(){
            return this.$store.getters.username
        }
    },
    created(){
        this.user.loggedin = this.$store.state.userInfo.loggedin
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
.nav a{float:left;width:auto;margin-right:65px;height:56px;line-height:56px;text-decoration: none;}
.nav a:hover{color:#4c54f9;text-decoration: none;}
.nav_show{color:#4c54f9 !important;}
.login_btn_div{float:right;width:170px;height:56px;padding-top:13px;box-sizing:border-box;margin-right:95px;}
.login_btn_div a{width:80px;height:30px;border-radius:3px;font-size:12px;display:block;float:left;box-sizing:border-box;}
.login_btn_div_register{background:#4c54f9;color:white;float:right !important;line-height:28px;}
.login_btn_div_login{border:1px solid #4c54f9;color:#4c54f9;line-height:25px;}

.person-nav-wrapper{
    float:right;height:56px;padding-top:13px;box-sizing:border-box;margin-right:95px;
}
.person-nav{
    color:#627482;
    padding: 0 15px;
    height:30px;
    line-height: 30px;
    font-size:12px;display:block;float:left;box-sizing:border-box;
}
.person-nav-active{
    color:#4c54f9;
}
.navbar{
    color:#627482;
}
.nav:hover{color:#4c54f9;text-decoration: none;}
.navbar-active{
    color: #4c54f9;
}
</style>