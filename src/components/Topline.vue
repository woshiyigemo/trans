<template>
    <div class="index_top">
        BTC/CNY : <span>{{btccny}}</span> 
        ETH/CNY : <span>{{ethcny}}</span>
        USDT/CNY : {{usdtcny}}
    </div>
</template>

<script>
export default {
    name:'Topline',
    props:{
        
    },
    data(){
        return{
            btccny:67871.91,
            ethcny:5011.54,
            usdtcny:6.31,
            socket1:new WebSocket('ws://54.65.108.119:9541'),
        }
    },
    created(){
    },
    mounted () {
       var self=this
       this.socket1.onmessage=function(data){
            var res = JSON.parse(data.data)
            console.log(res,7878)
       }
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
<style scoped>
    .index_top{text-align: center;width:100%;min-height:35px;background:#07090b;font-size:12px;line-height:35px;color:#4e6780;height:auto;}
    .index_top span{color:#66e014;margin-right:20px;}
</style>