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
            <router-view/>
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

        }
    }
}
</script>
<style scoped>

.real_name{width: 1200px;height: 1233px;margin: 0 auto;margin-top: 60px;}
/* 左侧边栏 */
.real_left{width: 200px;height: 1233px;background: #191f27;float: left;}
.real_left ul li{width: 200px;height: 59px;font-size: 13px;text-align: center;line-height: 59px;color: #526078;list-style: none;}
.real_left ul li:first-child{height: 81px;line-height: 81px;font-size: 19px;}
.real_left li:nth-child(2){border-top: 1px solid #202234;border-bottom: 1px solid #202234;}
.select{background: #151920;border-right: 5px solid #4c54f9;box-sizing: border-box;}

/* 右侧内容 */ 
.real_right{width: 987px;height: 1233px;background: #191f27;float: right;}
</style>

