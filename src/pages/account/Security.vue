<template>
    <div class="section">
        <div class="basic">
        <h5 class="basic_title">基本资料</h5>
        <ul class="message">
            <li>UID:</li>
            <li>666666</li>
        </ul>
        <ul class="message">
            <li>等级:</li>
            <li></li>
            <li class="message_v">普通</li>
        </ul>
        <ul class="message">
            <li>登录密码:</li>
            <li>*******</li>
            <li class="loginpwd" @click="changeSignPwd">修改</li>
        </ul>
        <ul class="message">
            <li>资金密码:</li>
            <li>*******</li>
            <li class="capitalpwd">修改</li>
        </ul>
        </div>

        <div class="account ">
            <h5 class="basic_title">账号安全</h5>
            <ul class="message">
            <li>谷歌验证:</li>
            <li></li>
            <li class="google">去绑定</li>
        </ul>
        <ul class="message">
            <li>邮箱验证:</li>
            <li>maxd@dkkd.com</li>
            <li class="capitalpwd">修改</li>
        </ul>
        </div>

        <!-- 模态框 -->
        <el-dialog
        title="交易密码设置"
        :visible.sync="signPwdModalVisible"
        width="30%"
        center>
            <el-form :model="signPwd">
                <el-form-item label="活动名称" label-width="70px">
                    <el-input v-model="signPwd.pwd" placeholder="请选择活动区域" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" label-width="70px">
                    <el-input v-model="signPwd.pwdT" placeholder="请选择活动区域" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="dialog-confirm-btn" type="primary" @click="saveChangeSignPwd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { api } from '@/static/api'
import { nationalityInfo } from '@/static/dataConfig'
import { Validate } from '@/static/common'
export default {
    name:'Security',
    props:{

    },
    data(){
        return{
            signPwdModalVisible:false,
            payPwdModalVisible:false,
            signPwd:{
                pwd:'',
                pwdT:''
            }
        }
    },
    computed:{

    },
    methods:{
        changeSignPwd(){
            this.signPwdModalVisible = true
        },
        cancelChangeSignPwd(){
            this.signPwdModalVisible = false
        },
        saveChangeSignPwd(){
            this.signPwdModalVisible = false
        }
    },
    created(){

    },
    mounted(){
        
    }
}
</script>
<style lang="scss" scoped>

/* 右侧  */
.section{width: 987px;height: 946px;float: right;}
.basic{width: 987px;height: 437px;background: #191f27;padding: 0 50px;box-sizing: border-box;}
.basic_title{font-size: 14px;color: #c2c3ca;line-height: 54px;}
.message{height: 91px;border-top: 1px solid #202234;overflow: hidden;list-style: none;}
.message li{float: left;line-height: 91px;color: #a2b2c8;font-size: 14px;height: 91px;cursor: pointer;}
.message li:first-child{width:337px;}
.message li:nth-child(2){width:340px;text-align: right;}
.message li:nth-child(3){width:210px;text-indent: 86px;}
.message_v{background: url("~@/assets/img/v.png") 30% 50% no-repeat;}
.loginpwd{background: url("~@/assets/img/yes.png") 30% 50% no-repeat;}
.capitalpwd{background: url("~@/assets/img/yes.png") 30% 50% no-repeat;}

/* 账号安全 */
.account{width:987px;height: 495px;background: #191f27;padding: 0 50px;box-sizing: border-box;margin-top: 15px;}
.google{background: url("~@/assets/img/wrong.png") 30% 50% no-repeat;}
</style>

