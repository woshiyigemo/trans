<template>
    <div>
        <el-container class="fs-container">
            <el-aside class="leftside" style="width:370px;">
                <div class="inner-wrapper">
                    <el-container class="dash">
                        <el-aside class="left-pic"  style="width:76px;">
                            <img class="left-pic"  src="@icon/bitcoin-icon.png" alt=""/>
                        </el-aside>
                        <el-main class="right-word">
                            <div class="right-l1">BTC/USDT  11499.97</div>
                            <div class="right-l2">≈  559655 CNY</div>
                            <div class="right-l3">2.84 %</div>
                            <div class="right-l4">高：15695.98 低：15695.98</div>
                        </el-main>
                        
                    </el-container>
                    <!-- 市场 -->
                    <div class="cur-price">
                        <div class="tabs-header">
                            <i class="arrow-right el-icon-arrow-right"></i>
                            市场
                        </div>
                        <el-tabs type="border-card" class="market-table">
                            
                            <el-tab-pane label="USTD">
                                <div class="market-list-header" >
                                            <span class="rel1"></span>
                                            <span class="rel2">币种</span>
                                            <span class="rel3">最新价</span>
                                            <span class="rel4">24h涨幅</span>
                                        </div>
                                <div class="vuebar-element" v-bar="{preventParentScroll:true,scrollThrottle:50}"> <!-- el1 -->
                                    <div>
                                        <div class="market-list" v-for="(item,index) in marketListUSDT">
                                            <span class="rel1">{{item.icon}}</span>
                                            <span class="rel2">{{item.type}}</span>
                                            <span class="rel3">{{item.price}}</span>
                                            <span class="rel4" :class="item.positive?'rise':'fall'">{{item.rise}}%</span>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="UT">
                                <div class="vuebar-element" v-bar="{preventParentScroll:true,scrollThrottle:50}"> <!-- el1 -->
                                    <div> 
                                        <div class="market-list" v-for="(item,index) in marketListUT" >
                                            <span class="rel1">{{item.icon}}</span>
                                            <span class="rel2">{{item.type}}</span>
                                            <span class="rel3">{{item.price}}</span>
                                            <span class="rel4" :class="item.rise >=0?'rise':'fall'">{{item.rise}}%</span>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs> 
                    </div>

                    <!-- 交易 -->
                    <div class="exchange">
                        <div class="tabs-header">
                            <i class="arrow-right el-icon-arrow-right"></i>
                            交易
                        </div>
                        <el-tabs type="border-card" class="market-table">
                            
                            <el-tab-pane label="限价">
                                <div class="tips">
                                    可用：{{exchange.balance}} USDT
                                </div>
                                <div class="tips-big">
                                    *市场最优价格（买卖）
                                </div>
                                <div class="deal-form">
                                    <div class="amount-label">
                                        数量
                                    </div>
                                    <el-input class="amount-input" type="number" v-model="exchange.amount" @change="computePercent"  placeholder="交易额">
                                        <template slot="append">BTC</template>
                                    </el-input>
                                    <el-slider 
                                    v-model="exchange.percent" 
                                    :show-tooltip="false"
                                    :show-stops="true"
                                    @change="computeAmount"
                                    ></el-slider>
                                     <div class="amount-tips">
                                    交易额:{{exchange.amount}} USDT
                                    </div>
                                    <div class="btn-wrapper">
                                        <el-button type="purchase" value="purchase" @click="addDelegate($event)">买入</el-button>
                                        <el-button type="sell" value="sell"  @click="addDelegate($event)">卖出</el-button>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="市价">
                                <div class="vuebar-element" v-bar="{preventParentScroll:true,scrollThrottle:50}">
                                    <div >
                                        <div class="market-list" v-for="(item,index) in marketListUT">
                                            <span class="rel1">{{item.icon}}</span>
                                            <span class="rel2">{{item.type}}</span>
                                            <span class="rel3">{{item.price}}</span>
                                            <span class="rel4" :class="item.rise >=0?'rise':'fall'">{{item.rise}}%</span>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs> 
                    </div>


                    <!-- 持有 -->
                    <div class="mycoins">
                        <div class="normal-header">
                            <i class="arrow-right el-icon-arrow-right"></i>
                            持有
                        </div>
                        <div class="market-list-header" >
                                    <span class="rel1"></span>
                                    <span class="rel2">币种</span>
                                    <span class="rel3">最新价</span>
                                    <span class="rel4">24h涨幅</span>
                        </div>
                        <div class="vuebar-element" 
                        v-bar="{preventParentScroll:true,scrollThrottle:50}">
                            <div >
                                <div class="market-list" v-for="(item,index) in mycoins">
                                    <span class="rel1">{{item.icon}}</span>
                                    <span class="rel2">{{item.type}}</span>
                                    <span class="rel3">{{item.price}}</span>
                                    <span class="rel4" :class="item.positive?'rise':'fall'">{{item.rise}}%</span>
                                </div>
                            </div>
                        </div> 
                    </div>


                    <div class="boardcast">
                        <div class="normal-header">
                            <i class="arrow-right el-icon-arrow-right"></i>
                            公告
                        </div>
                        <div class="vuebar-element" v-bar="{preventParentScroll:true,scrollThrottle:50}">
                            <div >
                                <div class="market-list" v-for="(item,index) in mycoins">
                                    <span class="rel1">{{item.icon}}</span>
                                    <span class="rel2">{{item.type}}</span>
                                    <span class="rel3">{{item.price}}</span>
                                    <span class="rel4" :class="item.positive?'rise':'fall'">{{item.rise}}%</span>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </el-aside>
            <el-main class="rightside">
                <div class="kline">
                    <div class="kline-header">
                         <i class="arrow-right el-icon-arrow-right"></i>
                            图表
                            <el-select v-model="curChart" style="width:100px;" filterable placeholder="请选择">
                                <el-option
                                v-for="item in chartOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </div>
                    <div style="height:400px;">
                       <iframe id="show-iframe"  frameborder=0 name="showHere" scrolling=auto src="http://frontend.sy.sxurl.cn/kline/versiontwo?plate_id=usdt_to_eth&1524061966"></iframe> 
                    </div>
                </div>
                <div class="exchange-table">
                    <div class="exchange-table-header cur-delegation">
                        <i class="arrow-right el-icon-arrow-right"></i>
                            当前委托
                    </div>
                    <el-table class="exchange-table"
                    :data="curDelegation"
                    style="width: 100%">
                        <el-table-column
                            prop="time"
                            label="时间"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="a1"
                            label="交易对"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="a2"
                            label="方向">
                        </el-table-column>
                        <el-table-column
                            prop="a3"
                            label="价格(USDT)">
                        </el-table-column>
                        <el-table-column
                            prop="a4"
                            label="数量(BTC)">
                        </el-table-column>
                        <el-table-column
                            prop="a5"
                            label="委托总额">
                        </el-table-column>
                        <el-table-column
                            prop="a6"
                            label="已成交">
                        </el-table-column>
                        <el-table-column
                            prop="a7"
                            label="未成交">
                        </el-table-column>
                        <el-table-column
                            prop="a8"
                            label="操作">
                        </el-table-column>
                    </el-table>
                </div> 
                <div class="exchange-table">
                    <div class="exchange-table-header cur-delegation">
                        <i class="arrow-right el-icon-arrow-right"></i>
                            历史委托
                    </div>
                    <el-table class="exchange-table"
                    :data="hisDelegation"
                    style="width: 100%">
                        <el-table-column
                            prop="time"
                            label="时间"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="a1"
                            label="交易对"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="a2"
                            label="方向">
                        </el-table-column>
                        <el-table-column
                            prop="a3"
                            label="价格(USDT)">
                        </el-table-column>
                        <el-table-column
                            prop="a4"
                            label="数量(BTC)">
                        </el-table-column>
                        <el-table-column
                            prop="a5"
                            label="委托总额">
                        </el-table-column>
                        <el-table-column
                            prop="a6"
                            label="已成交">
                        </el-table-column>
                        <el-table-column
                            prop="a7"
                            label="未成交">
                        </el-table-column>
                        <el-table-column
                            prop="a8"
                            label="操作">
                        </el-table-column>
                    </el-table>
                </div>  
                <el-row :gutter="20">
                    <el-col :span="16">
                        <div class="exchange-table">
                            <div class="exchange-table-header cur-delegation">
                                <i class="arrow-right el-icon-arrow-right"></i>
                                    深度图
                            </div>
                            <el-table class="exchange-table"
                            :data="realTimeDeal"
                            style="width: 100%">
                                <el-table-column
                                    prop="puser"
                                    label="买盘"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="amount"
                                    label="数量"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="p"
                                    label="累计">
                                </el-table-column>
                                <el-table-column
                                    prop="order_price"
                                    label="价格">
                                </el-table-column>
                            </el-table>
                        </div> 
                    </el-col>
                    <el-col :span="8">
                        <div class="exchange-table">
                            <div class="exchange-table-header cur-delegation">
                                <i class="arrow-right el-icon-arrow-right"></i>
                                    实时成交
                            </div>
                            <el-table class="exchange-table"
                            :data="realTimeDeal"
                            style="width: 100%">
                                <el-table-column
                                    prop="time"
                                    label="时间"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="direction"
                                    label="方向"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="price"
                                    label="价格">
                                </el-table-column>
                                <el-table-column
                                    prop="amount"
                                    label="数量">
                                </el-table-column>
                            </el-table>
                        </div> 
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>
<script>
// import Vue from 'vue'
// import VueWebsocket from "vue-websocket";
// Vue.use(VueWebsocket, "ws://54.65.108.119:9541")
import Topline from '@/components/Topline'
import Navibar from '@/components/Navibar'
import Foot from '@/components/Foot'
import ScrollBar from 'vue2-scrollbar'
import { api } from '@/static/api'
import { functionDeclaration } from 'babel-types';
export default {
    name:'CoinExchange',
    props:{
        
    },
    data(){
        return{
            barContainerStyle:{
                width:'6px',
                backgroundColor:'#202832'
            },
            barStyle:{
                width:'6px',
                backgroundColor:'#344253'
            },
            marketListUSDT:[
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:false
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:false
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                }
            ],
            marketListUT:[
                {
                    icon:'',
                    type:'BTC',
                    price:'23499.975',
                    rise:'2.28'
                },
                {
                    icon:'',
                    type:'BTC',
                    price:'23499.975',
                    rise:'2.28'
                },
                {
                    icon:'',
                    type:'BTC',
                    price:'23499.975',
                    rise:'-2.28',

                },
                {
                    icon:'',
                    type:'BTC',
                    price:'23499.975',
                    rise:'-2.28'
                },
                {
                    icon:'',
                    type:'BTC',
                    price:'23499.975',
                    rise:'2.28'
                },
                {
                    icon:'',
                    type:'BTC',
                    price:'23499.975',
                    rise:'2.28'
                },
                {
                    icon:'',
                    type:'BTC',
                    price:'23499.975',
                    rise:'2.28'
                },
                {
                    icon:'',
                    type:'BTC',
                    price:'23499.975',
                    rise:'2.28'
                }
            ],
            mycoins:[
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:false
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:false
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                },
                {
                    icon:'$',
                    type:'BTC',
                    price:'11499.975',
                    rise:'2.28',
                    positive:true
                }
            ],
            exchange:{
                balance:46314,
                percent:0,
                amount:0
            },
            curChart:null,
            chartOptions:[
                {
                    value:1,
                    label:'BTC/USTD'
                },
                {
                    value:2,
                    label:'BTC/USTD'
                },
                {
                    value:3,
                    label:'BTC/USTD'
                },

                {
                    value:4,
                    label:'BTC/USTD'
                }
            ],
            curDelegation:[
                {
                    time:'2018-01-01',
                    a1:'',
                    a2:'',
                    a3:'',
                    a4:'',
                    a5:'',
                    a6:'',
                    a7:'',
                    a8:'8'
                }
            ],
            hisDelegation:[
                {
                    time:'2018-01-01',
                    a1:'',
                    a2:'',
                    a3:'',
                    a4:'',
                    a5:'',
                    a6:'',
                    a7:'',
                    a8:'8'
                }
            ],
            realTimeDeal:[]
        }
    },
    components:{
      Topline:Topline,
      Navibar:Navibar,
      Foot:Foot,
      ScrollBar
    },
    created(){
        this.getCurDelegate()
        this.getHisDelegate()
        // this.get()
        
    },
    mounted () {
        var self = this
        console.log(3333,self.realTimeDeal)
        this.$options.sockets.onmessage = function(data){
            // console.log(JSON.parse(data.data))
            var res = JSON.parse(data.data)
            // console.log(555555,data.data.sb,JSON.parse(data.data.sb))
            self.realTimeDeal =  res.sb
            console.log(444444,self.realTimeDeal)
            // self.$apply()
            // this.realTimeDeal.forEach((o,i)=>{
            //     o.puser = '买' + (i+1).toString()
            //     this.$apply()
            // })
            // console.log(data)
        } 
    },
    watch:{
        
    },
    methods:{
        sendSocket() {
            this.$socket.emit("get",(response) => {
                console.log(response)
            })
        },
        computeAmount(){
            this.exchange.amount = (this.exchange.balance * (this.exchange.percent/100)).toFixed(0)
        },
        computePercent(){
            this.exchange.percent = Math.floor(this.exchange.amount/this.exchange.balance*100)
        },
        // 获取当前委托
        getCurDelegate(){
            var data = {
                page:1
            }
            api.curDelegate(data)
            .then(res => {
                console.log("当前委托",res)
            }).catch(err => {

            })
        },
        // 获取历史委托
        getHisDelegate(){
            var data = {
                page:1
            }
            api.hisDelegate(data)
            .then(res => {
                console.log("历史委托",res)
            }).catch(err => {

            })
        },
        // 新增委托
        addDelegate($event){
            console.log($event.currentTarget.value)
            const trade_type = $event.currentTarget.value == 'purchase'?0:1
            let reg = /\d*/
            if(this.exchange.amount < 0 || !reg.test(this.exchange.amount)){
                return
            }

            var data = {
                currency:'CNY',                     //基础货币，货币符号 CNY,BTC，ETH，UT等
                order_amount:this.exchange.amount,   //订单金额
                order_price:0,                      //订单价格
                order_type:0,                       //订单类型，0 限价单，1市价单
                trade_currency:'CNY',               //交易货币，货币符号 CNY,BTC，ETH，UT等
                trade_type:trade_type                        //交易类型，0买单，1买单
            }
            api.addDelegate(data)
            .then(res => {
                
            }).catch(err => {

            })
        },
        // 取消委托
        cancelDelegate(){
            var data = {
                order_id:1,
                currency:'btc'
            }
            api.cancelDelegate(data)
            .then(res => {

            }).catch(err => {

            })
        }
    }
}
</script>
<style lang='scss' scoped>
.market-table{
    background-color: #191f27;
    font-size: 14px;
    color: #617997;
    position: relative;
}
.vuebar-element {
  height: 150px;
  width: 100%;
  background: #191f27;
  transform: rotate3d(0,0,0,0);
}
.market-list-header,
.market-list{
    width: 100%;
    background: #191f27;
    overflow: hidden;
    white-space:nowrap; 
    color:#c2c3ca;
    line-height: 1.5;
    height: 21px;
    text-align: center;
    .rel1{
        width: 36px;
        display: inline-block;
    }
    .rel2{
        width: 60px;
        display: inline-block;
    }
    .rel3{
        width: 100px;
        display: inline-block;
    }

    .rel4.rise{
        width: 80px;
        display: inline-block;
        color:#a4454b;
    }
    .rel4.fall{
        width: 80px;
        display: inline-block;
        color:#5ead6f;
    }
}
.market-list-header{
    font-size: 12px;
    color:#384456;
}


.exchange-table{
    font-size: 12px;

    

    
}

#show-iframe{
    width: 100%;
    height: 100%;
}
</style>