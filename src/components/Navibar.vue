<template>
    <div class="index_top_t">
        <div class="logo" @click="goHome"></div>
        <div class="nav">
            <router-link class="navbar" active-class="navbar-active" to="/home">首页</router-link>
            <router-link class="navbar" active-class="navbar-active" v-if="userloggedin" to="/exchange/coinexchange">币币交易</router-link>
            <router-link class="navbar" active-class="navbar-active" to="/wiki">新手帮助</router-link>
            <!-- <router-link class="navbar" active-class="navbar-active" to="/notice">公告中心</router-link> -->
        </div>
        <div class="login_btn_div"  v-if="!userloggedin">
            <router-link class="login_btn_div_login" to="/user/login">登录</router-link>
            <router-link class="login_btn_div_register" to="/user/regist">注册</router-link>
        </div>
        <div class="person-nav-wrapper"  v-if="userloggedin">
            <router-link class="person-nav" active-class="person-nav-active" to="/order" @click.native="clickOrder"><img :src="orderImg?require('../assets/img/order.png'):require('../assets/img/selected-order.png')" />订单</router-link>
            <!-- <router-link class="person-nav" active-class="person-nav-active" to="/account/security">用户：{{username}}</router-link> -->
             <el-dropdown class="person-nav" trigger="click" >
                 
                <span>
                    <img src="~@/assets/img/user.png" />
                    用户：{{username}}
                </span>
                <!-- <router-link class="person-nav" active-class="person-nav-active">用户：{{username}}</router-link> -->
                <el-dropdown-menu slot="dropdown" class="nav-dropdown">
                    <el-dropdown-item>
                        <!-- <router-link class="person-nav"  to="/account/security"> -->
                        <span class="person-nav-block" @click="goSecurity">
                            账户安全
                        </span>
                        <!-- </router-link> -->
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <!-- <router-link class="person-nav" to="/account/identityverify"> -->
                        <span class="person-nav-block" @click="goIdentityVerify">
                            实名认证
                        </span>
                        <!-- </router-link> -->
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <!-- <router-link class="person-nav" @click="logout" active-class="person-nav-active" to="/home"> -->
                        <span class="person-nav-block" @click="logout">
                            退出
                        </span>
                        <!-- </router-link> -->
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            
            <router-link class="person-nav" active-class="person-nav-active" to="/property/coinoption" @click.native="clickAssets"><img :src="assetsImg?require('../assets/img/assets.png'):require('../assets/img/selected_assets.png')" />资产</router-link>
        </div>
    </div>
</template>

<script>
import { api } from '@/static/api'
export default {
    name:'Navibar',
    props:{
        
    },
    data(){
        return{
            orderImg:true,
            assetsImg:true,
            // original:,
            // clickorder:,
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

    },
    mounted () {
       
    },
    watch:{
        
    },
    methods:{
        goHome(){
            this.$router.replace({name:'home'})
        },
        goSecurity(){
            this.$router.replace({name:'security'})
        },
        goIdentityVerify(){
            this.$router.replace({name:'identityverify'})
        },
        logout(){
            api.userLogOut()
            .then(res => {
                this.$store.dispatch('userLogout')
            }).catch(err => {
                this.$store.dispatch('userLogout')
            })  
        },
        clickOrder(){
            this.orderImg = false
            this.assetsImg = true
        },
        clickAssets(){
            this.assetsImg = false
            this.orderImg = true
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel='stylesheet/scss' scoped>
.index_top_t{text-align: center;width:100%;min-height:56px;height:auto;background:#202832;overflow:hidden}
.logo{float:left;width:125px;height:56px;background:url('~@/assets/img/logo.png') no-repeat center;margin-left:80px;}
.nav{width:auto;margin-left:90px;height:56px;min-width:320px;float:left;font-size: 14px;}
.nav a{float:left;width:auto;margin-right:65px;height:56px;line-height:56px;text-decoration: none;}
.nav a:hover{color:#4c54f9;text-decoration: none;}
.nav_show{color:#4c54f9 !important;}
.login_btn_div{float:right;width:170px;height:56px;padding-top:13px;box-sizing:border-box;margin-right:95px;}
.login_btn_div a{width:80px;height:30px;border-radius:3px;font-size:12px;display:block;float:left;box-sizing:border-box;}
.login_btn_div_register{background:#4c54f9;color:white;float:right !important;line-height:30px;}
.login_btn_div_login{border:1px solid #4c54f9;color:#4c54f9;line-height:28px;}

.person-nav-wrapper{
    float:right;height:56px;padding-top:13px;box-sizing:border-box;margin-right:95px;overflow: hidden;
}
.person-nav-wrapper>a>img{display: inline-block; vertical-align: middle;margin-right: 10px;}
.person-nav{
    color:#8d9fb8;
    padding: 0 15px;
    height:30px;
    line-height: 30px;
    font-size:12px;display:block;float:left;box-sizing:border-box;
    outline: none;
}
.person-nav>span>img{
    display: inline-block; vertical-align: middle;margin-right: 10px;
}

.person-nav-block{
    color:#8d9fb8;
    padding: 0 15px;
    height:30px;
    line-height: 30px;
    font-size:12px;display:block;box-sizing:border-box;
    outline: none;
   
}
.person-nav-active{
    color:#4c54f9;
}
.navbar{
    color:#8d9fb8;
}
.nav:hover{color:#4c54f9;text-decoration: none;}
.navbar-active{
    color: #4c54f9;
}
</style>