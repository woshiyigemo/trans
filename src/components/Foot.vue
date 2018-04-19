<template>
    <div class="footer_back">
        <div class="footer">
            <img class="footer_logo" src="@/assets/bottom-logo.png" alt="">
            <ul class="links">
                <li>关于我们</li>
                <li>公司介绍</li>
                <li>注册协议</li>
                <li>免责声明</li>
            </ul>
            <div  class="copy">
            ©2018 AUE Technology Chain
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Foot',
    props:{
        
    },
    data(){
        return{

        }
    },
    created(){
        
    },
    mounted () {
       
    },
    watch:{
        
    },
    methods:{

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel='stylesheet/scss' scoped>
.footer_back{
    background-color:#151920;
   width: 100%;
   overflow: hidden;
}
.footer{
    width: 600px;
    margin:0 auto; 
    overflow: hidden;
}
.footer_logo{
    margin:80px auto 80px auto;
    width:248px;
    height:58px;
    display:block;
}
.footer .links{
    list-style:none;
    color:#526079;
    font-size: 16px;
    overflow: hidden;
    margin-bottom:110px;
}
.footer .links li{
    float: left;
    text-align: center;
    width: 150px;
    display: block;
    height: 24px;
    line-height: 1.5;
}
.footer .copy{
    color:#526079;
    font-size: 14px;
    margin-bottom:40px;
    text-align: center;
}
</style>