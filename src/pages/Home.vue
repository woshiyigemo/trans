<template>
    <div>
        <div class="banner"></div>
        <div class="ad">
            <img src="@/assets/img/index3.png" align="middle" />开放比特币糖果(cdy)充值提现
        </div>
        <div class="main-wrapper">
            <div class="main-inner">
                <div class="main_cat">
                    <a href="javascript:void(0);">USD交易区</a>
                    <a href="">HKD交易区</a>
                    <a href="javascript:void(0);">BTC交易区</a>
                </div>
                <div class="hr"></div>
                <div class="main_cat_con">
                    <div class="main_cat_con_t main_cat_con_t_first main_cat_con_t_usd"></div>
                    <div class="main_cat_con_t">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div>
                    <div class="main_cat_con_t">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div> 
                    <div class="main_cat_con_t">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div>
                    <div class="main_cat_con_t">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div>
                    <div class="main_cat_con_t">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div>
                    <div class="main_cat_con_t main_cat_con_t_first">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div>
                    <div class="main_cat_con_t ">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div>
                </div>
                <div class="main_cat_con">
                    <div class="main_cat_con_t main_cat_con_t_first main_cat_con_t_hkd"></div>
                    <div class="main_cat_con_t">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div>
                    <div class="main_cat_con_t">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div> 
                    <div class="main_cat_con_t">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div>
                    <div class="main_cat_con_t">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div>
                    <div class="main_cat_con_t">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div>
                    <div class="main_cat_con_t main_cat_con_t_first">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent">+0.68%</div>
                    </div>
                    <div class="main_cat_con_t ">
                        <div class="main_cat_con_t_title">BCH / USD</div>
                        <div class="main_cat_con_t_money">1234.01</div>
                        <div class="main_cat_con_t_percent main_cat_con_t_percent_low">+0.68%</div>
                    </div>
                </div>
                <div class="main_footer">
                    <img src="@/assets/img/index6.png" witdh="100%">
                </div>
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

        }
    },
    components:{
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
<style  rel='stylesheet/scss' scoped>
.banner{background:#202832 url('~@/assets/img/index1.png') no-repeat center;width:100%;height:580px;}
.ad{width:100%;height:60px;line-height:60px;background:#fffbf4;color:#ffa33e;} 
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
.main_cat_con_t_hkd{background:#4c54f9 url('~@/assets/img/index5.png') no-repeat center;}
.main_cat_con_t_title{width:100%;text-align:left;font-size:12px;height:14px;line-height:14px;font-weight:bold;}
.main_cat_con_t_money{width:100%;margin-top:18px;font-size:14px;text-align:left;font-weight:bold;font-size:16px;line-height:16px;height:16px;}
.main_cat_con_t_percent{margin-top:10px;color:#f45e5f;font-size:12px;text-align:left;width:100%;}
.main_cat_con_t_percent_low{color:#14bb81;}
.main_footer{width:1200px;margin-top:20px}
</style>