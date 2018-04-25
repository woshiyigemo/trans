<template>
    <div class="real_name">
        <div class="real_left">
             <ul>
                 <li>个人中心</li>
                 <li>账号安全</li>
                 <li class="select">实名认证</li>
             </ul>
        </div>
        <div class="real_right">
             <div class="real_right_title">
                  <div class="title_v">实名认证</div>
                  <div class="bj_ca"></div>
             </div>
             <!-- 身份证验证表单 -->
             <div class="from" v-show="false">
                <el-form ref="form" :model="form"  label-width="100px">
                    <h5>1.个人基本资料认证</h5>
                    <el-form-item label="姓名：">
                        <el-tooltip :popper-class="toolTipClass" class="item" effect="#3a4a5e" content="*Center Right 提示文字" placement="right">
                            <el-input placeholder="请输入姓名" clearable></el-input>
                        </el-tooltip>
                    </el-form-item>

                    <el-form-item label="身份证号：">
                        <el-tooltip :popper-class="toolTipClass" class="item" effect="#3a4a5e" content="*Center Right 提示文字*Center Right 提示文字*Center Right 提示文字*Center Right 提示文字" placement="right">
                            <el-input placeholder="请输入身份证号" clearable></el-input>
                        </el-tooltip>
                    </el-form-item>
                    
                    <h5 style="height:100px;line-height:125px;">2.信息认证</h5>
                    <div class="information">
                        <div>
                            <ul>
                                <li style="text-indent: 15px;">身份证件正面：</li>
                                <li><img src="~@/assets/img/id_1.png" alt=""></li>
                                <li class="addimg">+</li>
                                <li class="upload"><span>上传</span><img src="~@/assets/img/chuan.png"/></li>
                                <li class="prompt">*上传支持jpg/png</li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li style="text-indent: 15px;">身份证件背面：</li>
                                <li><img src="~@/assets/img/id_2.png" alt=""></li>
                                <li class="addimg">+</li>
                                <li class="upload"><span>上传</span><img src="~@/assets/img/chuan.png"/></li>
                            </ul>
                        </div>
                        <div  class="int">
                            <ul>
                                <li style="text-indent: 15px;">手持身份证：</li>
                                <li><img src="~@/assets/img/id_3.png" alt=""></li>
                                <li class="addimg">+</li>
                                <li class="upload"><span>上传</span><img src="~@/assets/img/chuan.png"/></li>
                                <li class="prompt">*请提供一张手持证件照</li>
                            </ul>
                        </div>
                    </div>

                    <div class="btn">提交</div>
                </el-form>
             </div>

             <!-- 护照验证表单 -->
             <div class="from" v-show="true">
                <el-form ref="form" :model="form"  label-width="100px">
                    <h5>1.个人基本资料认证</h5>
                    <el-form-item label="姓名：">
                        <el-tooltip :popper-class="toolTipClass" class="item" effect="#3a4a5e" content="*Center Right 提示文字" placement="right">
                            <el-input placeholder="请输入姓名" clearable></el-input>
                        </el-tooltip>
                    </el-form-item>

                    <el-form-item label="护照号：">
                        <el-tooltip :popper-class="toolTipClass" class="item" effect="#3a4a5e" content="*Center Right 提示文字*Center Right 提示文字*Center Right 提示文字*Center Right 提示文字" placement="right">
                            <el-input placeholder="请输入护照号" clearable></el-input>
                        </el-tooltip>
                    </el-form-item>
                    
                    <h5 style="height:100px;line-height:125px;">2.信息认证</h5>
                    <div class="information">
                        <div class="port">
                            <ul>
                                <li style="text-indent: 15px;">护照正面：</li>
                                <li><img src="~@/assets/img/passport_2.png" alt=""></li>
                                <li class="addimg">
                                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
                                        +
                                    </el-upload>
                                </li>
                                <li class="upload"><span>上传</span><img src="~@/assets/img/chuan.png"/></li>
                                <li class="prompt">*上传支持jpg/png</li>
                            </ul>
                        </div>
                        <div class="port">
                            <ul>
                                <li style="text-indent: 15px;">护照背面：</li>
                                <li><img src="~@/assets/img/passport_1.png" alt=""></li>
                                <li class="addimg">+</li>
                                <li class="upload"><span>上传</span><img src="~@/assets/img/chuan.png"/></li>
                            </ul>
                        </div>
                        <div  class="int port">
                            <ul>
                                <li style="text-indent: 15px;">手持身份证：</li>
                                <li><img src="~@/assets/img/id_3.png" alt=""></li>
                                <li class="addimg">+</li>
                                <li class="upload"><span>上传</span><img src="~@/assets/img/chuan.png"/></li>
                                <li class="prompt">*请提供一张手持证件照</li>
                            </ul>
                        </div>
                    </div>

                    <div class="btn">提交</div>
                </el-form>
             </div>
             
             <!-- 完成实名认证 -->
             <div class="cpt" v-show="false">
                <div class="cpt_ok">
                    <img src="~@/assets/img/complete.png" /> 
                    <span>已完成实名认证~</span>
                </div>
                <div class="go_to_trade">去交易</div>
             </div>

             <!-- 完成实名认证 -->
             <div class="cpt" v-show="false">
                <div class="cpt_ok" style="width:318px;">
                    <img src="~@/assets/img/complete.png" /> 
                    <span>您的资料提交成功可以去交易了~</span>
                </div>
                <div class="go_to_trade">去交易</div>
             </div>
        </div>
    </div>
</template>
<script>
export default {
  name:'Home',
  props:{

  },
  data(){
        return{
           form: {
            name: ''
           },
           toolTipClass: 'page-login-toolTipClass'
        }
    }
}
</script>
<style>
*{margin: 0;padding: 0;}
ul li{list-style: none;}
.real_name{width: 1200px;height: 1233px;margin: 0 auto;}
/* 左侧边栏 */
.real_left{width: 200px;height: 1233px;background: #191f27;float: left;}
.real_left ul li{width: 200px;height: 59px;font-size: 13px;text-align: center;line-height: 59px;color: #526078;}
.real_left ul li:first-child{height: 81px;line-height: 81px;font-size: 19px;}
.real_left li:nth-child(2){border-top: 1px solid #202234;border-bottom: 1px solid #202234;}
.select{background: #151920;border-right: 5px solid #4c54f9;box-sizing: border-box;}

/* 右侧内容 */ 
.real_right{width: 987px;height: 1233px;background: #191f27;float: right;}
.real_right_title{width: 886px;margin: 0 auto;height: 82px;margin-top: 50px;}
.title_v{float:left;width: 300px;height: 82px;font-size: 22px;color: #4148cd;background:url('~@/assets/img/v1.png') no-repeat left;background-size: contain;line-height: 82px;text-align: center;}
.bj_ca{float:right;background: url('~@/assets/img/ka.png') no-repeat;width: 153px;height: 92px;background-size: contain;}
/* 表单 */
.from{width:886px;height: 900px;margin: 0 auto;margin-top: 65px;}
.from h5{font-size: 14px;color: #c2c3ca;border-top: 1px solid #202234;line-height: 54px;}
label{line-height: 90px!important;text-align: left!important;text-indent: 15px;color: #a2b2c8!important;}
.el-input{width:474px;height: 48px;margin: 21px 0 0 20px;}
.el-input input{width: 474px;height: 48px;background: #151920;color: #354456!important;}
.el-form-item{border-top: 1px solid #202234;margin:0;}
.page-login-toolTipClass{background: #3a4a5e!important;border-left-color: #3a4a5e!important;max-width: 200px;color: #a6c4ea;}
/* 信息验证 */
.port{height: 120px;border-top: 1px solid #202234;}
.port ul{overflow: hidden;}
.port li{float: left;line-height: 120px;}
.port li:first-child{width: 130px;color: #a2b2c8;font-size: 14px;}
.port li img{margin: 0 auto;display: inline-block;vertical-align: middle;margin: 0 25px;}
.el-upload{width: 90px;height: 58px!important;border-radius: 0;background: #151920;font-size: 19px;margin:31px 0;line-height: 58px;}
.upload{width: 76px;height: 26px;border-radius: 30px;text-align: center;background-color: #3a4a5e;margin: 47px 34px 47px 20px;line-height: 26px!important;font-size: 12px;color: #6d86a5;cursor: pointer;}
.upload span{float: left;text-indent: 17px;}
.upload img{float: left;margin:7.5px 6px!important;}
.prompt{font-size: 12px;line-height: 120px;color: #465971;}
.int{border-bottom: 1px solid #202234;}
/* 提交 */
.btn{width:310px;height: 50px;margin: 88px auto;background: #4c54f9;color:#fcfcf2;text-align: center;line-height: 50px;cursor: pointer;}

/* 去交易 */
.cpt{width:509px;margin: 0 auto; }
.cpt_ok{width: 205px;height: 48px;background-size: contain;line-height: 48px;margin: 0 auto;}
.cpt_ok img{float: left;margin-left: 8px;}
.cpt_ok span{float: left;text-indent: 25px;}
.go_to_trade{width:509px;height: 49px;background: #4c54f9;text-align: center;line-height: 49px;font-size: 18px;color: #d3d4f4;margin-top: 120px;}
 
</style>

