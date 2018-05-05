<template>
    <div>
        <div class="banner"></div>
        <div class="ad">
            <img src="@/assets/img/index3.png" align="middle" />{{pubNotice}}
        </div>
        <div class="main-wrapper">
            <div class="main-inner">
                <div class="main_cat" style="display:none;">
                    <a href="javascript:void(0);">USD交易区</a>
                    <a href="">HKD交易区</a>
                    <a href="javascript:void(0);">BTC交易区</a>
                </div>
                <div class="hr"></div>
                <div class="main_cat_con">
                    <div class="main_cat_con_t main_cat_con_t_first main_cat_con_t_usd"></div>
                    <div v-for="(item,index) in marketListUSDT" class="main_cat_con_t" :key="index">
                        <div class="main_cat_con_t_title">{{item.name.toUpperCase()}} / USDT</div>
                        <div class="main_cat_con_t_money">{{Number(item.order_price)}}</div>
                        <div class="main_cat_con_t_percent" :class="item.positive?'rise':'fall'">{{Math.abs(item.p)}}%</div>    
                    </div>
                </div>
                <div class="main_cat_con">
                    <div class="main_cat_con_t main_cat_con_t_first main_cat_con_t_hkd"></div>
                    <div class="main_cat_con_t" v-for="(item,index) in marketListUT" :key="index">
                        <div class="main_cat_con_t_title">{{item.name.toUpperCase()}} / UT</div>
                        <div class="main_cat_con_t_money">{{Number(item.order_price)}}</div>
                        <div class="main_cat_con_t_percent" :class="item.positive?'rise':'fall'">{{Math.abs(item.p)}}%</div>
                    </div>
                </div>
                <div class="main_footer">
                    <img src="@/assets/img/ban2.jpg" witdh="100%">
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import { api } from '@/static/api'
export default {
    name:'Home',
    props:{
        
    },
    data(){
        return{
            pubNotice:'开放比特币糖果(cdy)充值提现',
            newsocket:new WebSocket('ws://54.65.108.119:9541'),
            marketListUSDT:[],
            marketListUT:[]
        }
    },
    components:{
    },
    created(){
        this.getNotice()
    },
    mounted () {
        var self = this
        console.log(1111,self)
        this.newsocket.onmessage = function(data){           
            // console.log('原始ws数据',data)
            var res = JSON.parse(data.data)
            // console.log('ws数据',res)
            self.marketListUSDT =res.price.usdt;
            self.marketListUT =res.price.ut;
            for(var i in this.marketListUSDT){
                self.marketListUSDT[i].icon = '$'
                self.marketListUSDT[i].positive = self.marketListUSDT[i].p >=0?true:false
            }
            for(var i in this.marketListUT){
                self.marketListUT[i].icon = '$'
                self.marketListUT[i].positive = self.marketListUSDT[i].p >=0?true:false
            }
        }
    },
    watch:{
        
    },
    methods:{
        // 获取公告
        getNotice(){
            var data = {
                type:2
            }
            api.getNotice(data)
            .then(res => {
                if(res.error_code == 1000){
                    this.pubNotice = res.data.notice_content
                }
            }).catch(err => {})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel='stylesheet/scss' scoped>

.banner{background:#202832 url('~@/assets/img/ban.jpg') no-repeat center;width:100%;height:580px;}
.ad{width:100%;height:60px;line-height:60px;background:#fffbf4;color:#ffa33e; text-align: center;} 
.ad img{margin-top:-10px;margin-right:15px;}
.main-wrapper{
    background-color: #fff;
    
    overflow: hidden;
}
.main-inner{
    width: 1200px;
    margin:0 auto;
}
.main_cat{height:26px;width:1200px;margin-top:30px;margin-bottom: 30px}
.main_cat a{float:left;color:#41444b;border:1px solid #e1e1e1;border-radius:200px;line-height:24px;height:24px;box-sizing:border-box;font-size:11px;width:100px;float:left;margin-right:20px;text-align: center; }
.main_cat a:nth-child(1){color:white;background:#449283;border:none;}
.main_cat a:nth-child(2){color:white;background:#4c54f9;border:none;}
.hr{width:1200px;height:1px;background:#ebebeb;}

.main_cat_con{width:1200px;height:auto;margin-top:20px;margin-bottom: 20px;overflow:hidden}
.main_cat_con_t{width:190px;height:110px;float:left;margin-left:12px;background:#f7f8fb;padding:18px;box-sizing:border-box;margin-bottom:12px;}
.main_cat_con_t_first{margin-left:0px;}
.main_cat_con_t_usd{background:#449283 url('~@/assets/img/index4.png') no-repeat center;}
.main_cat_con_t_hkd{background:#4c54f9 url('~@/assets/img/ut.png') no-repeat center;}
.main_cat_con_t_title{width:100%;text-align:left;font-size:12px;height:14px;line-height:14px;font-weight:bold;}
.main_cat_con_t_money{width:100%;margin-top:18px;font-size:14px;text-align:left;font-weight:bold;font-size:16px;line-height:16px;height:16px;}
.main_cat_con_t_percent{margin-top:10px;color:#f45e5f;font-size:12px;text-align:left;width:100%;}
.main_cat_con_t_percent_low{color:#14bb81;}
.main_footer{width:1200px;margin-top:20px}
.rise{
        color:#a4454b;
    }
.fall{

        color:#5ead6f;
    }
</style>