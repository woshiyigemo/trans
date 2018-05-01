<template>
    <div class="real_name">
        <div class="real_left">
            <div class="option">个人中心</div>
            <router-link class="option" active-class="option-active" to="/account/security">账号安全</router-link>
            <router-link class="option" active-class="option-active" to="/account/identityverify">实名认证</router-link>
        </div>
        <div class="real_right">
            <router-view/>
        </div>
    </div>
</template>
<script>
export default {
  name:'Account',
  props:{

  },
  data(){
        return{

        }
    }
}
</script>
<style scoped>

.real_name{width: 1200px;height: 1233px;margin: 0 auto;margin-top: 60px;}
/* 左侧边栏 */
.real_left{width: 200px;height: 1233px;background: #191f27;float: left;}
.real_left .option{
    width: 200px;height: 59px;font-size: 13px;text-align: center;line-height: 59px;color: #526078;list-style: none;
    display: block;
}
.real_left .option:first-child{height: 81px;line-height: 81px;font-size: 19px;}
.real_left .option:nth-child(2){border-top: 1px solid #202234;border-bottom: 1px solid #202234;}
.real_left .option-active{
    background: #151920;border-right: 5px solid #4c54f9;box-sizing: border-box;display: block;
}
.select{background: #151920;border-right: 5px solid #4c54f9;box-sizing: border-box;}

/* 右侧内容 */ 
.real_right{width: 987px;height: 1233px;background: #191f27;float: right;}
</style>

