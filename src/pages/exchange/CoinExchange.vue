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
                            <div class="right-l1" v-if="price.usdt[0]" >BTC/USDT  {{price.usdt[0].order_price}}</div>
                            <div class="right-l2">≈  559655 CNY</div>
                            <div class="right-l3"  v-if="price.usdt[0]" :class="price.usdt[0].p>0?'red':'green'">{{curPrice}}%</div>
                            <div class="right-l4"  v-if="price.usdt[0]" >高：{{price.usdt[0].high}} 低：{{price.usdt[0].low}}</div>
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
                                        <div class="market-list" v-for="(item,index) in marketListUSDT" :key="index">
                                            <span class="rel1">{{item.icon}}</span>
                                            <span class="rel2">
                                                {{item.name.toUpperCase()}}
                                            </span>
                                            <span class="rel3">{{item.order_price}}</span>
                                            <span class="rel4" :class="item.positive?'rise':'fall'">{{Math.abs(item.p)}}%</span>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="UT">
                                <div class="market-list-header" >
                                    <span class="rel1"></span>
                                    <span class="rel2">币种</span>
                                    <span class="rel3">最新价</span>
                                    <span class="rel4">24h涨幅</span>
                                </div>
                                <div class="vuebar-element" v-bar="{preventParentScroll:true,scrollThrottle:50}"> <!-- el1 -->
                                    <div> 
                                        
                                        <div class="market-list" v-for="(item,index) in marketListUT"  :key="index">
                                            <span class="rel1">{{item.icon}}</span>
                                            <span class="rel2">{{item.name.toUpperCase()}}</span>
                                            <span class="rel3">{{item.order_price}}</span>
                                            <span class="rel4" :class="item.positive?'rise':'fall'">{{item.p}}%</span>
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
                        <el-tabs type="border-card" v-model="exchange.orderType" class="market-table">
                            
                            <el-tab-pane name="limitprice" label="限价">
                                <div class="tips">
                                    可用：{{exchange.balance}} USDT
                                </div>
                                <!-- <div class="tips-big">
                                    <el-input class="amount-input" type="number" v-model="exchange.price" placeholder="限价价格">
                                    </el-input>
                                </div> -->
                                <div class="deal-form">

                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <div class="amount-label">
                                                价格
                                            </div>
                                            <el-input class="amount-input" type="number" v-model="exchange.price" @change="computeAmount">
                                                <template slot="append">USDT</template>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="12">
                                            <div class="amount-label">
                                                数量
                                            </div>
                                            <el-input class="amount-input" type="number" v-model="exchange.amount">
                                                <template slot="append">BTC</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-slider 
                                    v-model="exchange.amount" 
                                    :show-tooltip="false"
                                    :show-stops="true"
                                    ></el-slider>
                                    <div class="amount-tips">
                                    交易额:{{allprice}} USDT
                                    </div>
                                    <div class="btn-wrapper">
                                        <el-button type="purchase" value="purchase" @click="addDelegate($event)">买入</el-button>
                                        <el-button type="sell" value="sell"  @click="addDelegate($event)">卖出</el-button>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane  name="marketprice" label="市价">
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
                                    <el-input class="amount-input" type="number" v-model.number="exchange.amount">
                                        <template slot="append">BTC</template>
                                    </el-input>
                                    <el-slider 
                                    v-model.number="exchange.percent"
                                    :show-tooltip="false"
                                    :show-stops="true"
                                    min.number="0"
                                    @change="computeAmount"
                                    ></el-slider>
                                    <div class="amount-tips">
                                    交易额:{{allcurprice}} USDT
                                    </div>
                                    <div class="btn-wrapper">
                                        <el-button type="purchase" value="purchase" @click="addDelegate($event)">买入</el-button>
                                        <el-button type="sell" value="sell"  @click="addDelegate($event)">卖出</el-button>
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
                        <div class="market-list-header pad15" >
                            <span class="rel1">币种</span>
                            <span class="rel2">可用</span>
                            <span class="rel3">冻结</span>
                            <span class="rel4">操作</span>
                        </div>
                        <div class="mycoins-table">
                            <div class="vuebar-element" 
                            v-bar="{preventParentScroll:true,scrollThrottle:50}">
                                <div >
                                    <div class="mycoin-list" v-for="(item,index) in mycoins" :key="index">
                                        <span class="rel1">{{item.plate_en.toUpperCase()}}</span>
                                        <span class="rel2">{{item.available}}</span>
                                        <span class="rel3">{{item.frozen}}</span>
                                        <span class="rel4">
                                             <el-button class="get-coin" @click="getCoin(item,index)" type="text" size="small">提币</el-button>
                                             <el-button  class="add-coin" @click="addCoin(item,index)" type="text" size="small">冲币</el-button>
                                        </span>
                                    </div>
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
                                <ul class="notice-list">
                                    <li class="notice-li" v-for="(item,index) in noticeList" :key="index">
                                        <span class="notice-squre">·</span>{{item.notice_title}}
                                    </li>
                                </ul>
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
                    <el-table class="center-table"
                    :data="curDelegation"
                    style="width: 100%">
                        <el-table-column
                            prop="time"
                            label="时间"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="duad"
                            label="交易对"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="direction"
                            label="方向">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="价格(USDT)">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="数量(BTC)">
                        </el-table-column>
                        <el-table-column
                            prop="total"
                            label="委托总额">
                        </el-table-column>
                        <el-table-column
                            prop="deal"
                            label="已成交">
                        </el-table-column>
                        <el-table-column
                            prop="untreated"
                            label="未成交">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <el-button @click="cancelDelegate(scope.row)" type="text" size="small">撤销</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div> 
                <div class="exchange-table">
                    <div class="exchange-table-header cur-delegation">
                        <i class="arrow-right el-icon-arrow-right"></i>
                            历史委托
                    </div>
                    <el-table class="center-table"
                    :data="hisDelegation"
                    style="width: 100%">
                        <el-table-column
                            prop="time"
                            label="时间"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="duad"
                            label="交易对"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="direction"
                            label="方向">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="价格(USDT)">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            label="数量(BTC)">
                        </el-table-column>
                        <el-table-column
                            prop="total"
                            label="委托总额">
                        </el-table-column>
                        <el-table-column
                            prop="deal"
                            label="已成交">
                        </el-table-column>
                        <el-table-column
                            prop="Untreated"
                            label="未成交">
                        </el-table-column>
                        <!-- <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <el-button @click="delHistory(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                </div>  
                <el-row :gutter="20">
                    <el-col :span="16">
                        <div class="exchange-table">
                            <div class="exchange-table-header cur-delegation">
                                <i class="arrow-right el-icon-arrow-right"></i>
                                    深度图
                            </div>
                            <el-row>
                                <el-col :span="12">
                                    <el-table class="center-table"
                                    :data="realTimeDeal.buy"
                                    style="width: 100%">
                                        <el-table-column
                                            prop="role"
                                            label="买盘"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="amount"
                                            label="数量"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="allamount"
                                            label="累计">
                                        </el-table-column>
                                        <el-table-column
                                            prop="order_price"
                                            label="价格">
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                                <el-col :span="12">
                                    <el-table class="center-table"
                                    :data="realTimeDeal.sell"
                                    style="width: 100%">
                                        <el-table-column
                                            prop="order_price"
                                            label="价格"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="allamount"
                                            label="累计">
                                        </el-table-column>
                                        <el-table-column
                                            prop="amount"
                                            label="数量"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="role"
                                            label="卖盘">
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>  
                        </div> 
                    </el-col>
                    <el-col :span="8">
                        <div class="exchange-table">
                            <div class="exchange-table-header cur-delegation">
                                <i class="arrow-right el-icon-arrow-right"></i>
                                    实时成交
                            </div>
                            <el-table class="exchange-table"
                            :data="realTimeDealList"
                            style="width: 100%">
                                <el-table-column
                                    prop="order_time"
                                    label="时间"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="order_price"
                                    label="价格">
                                </el-table-column>
                                <el-table-column
                                    prop="processed_amount"
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
// import ReconnectingWebSocket from 'reconnecting-websocket'
export default {
    name:'CoinExchange',
    props:{
        
    },
    data(){
        return{
            // socket_1:new WebSocket('ws://54.65.108.119:9541'),
            socket_1:new WebSocket('ws://54.65.108.119:9541'),
            socket_2:new WebSocket('ws://54.65.108.119:9542'),
            barContainerStyle:{
                width:'6px',
                backgroundColor:'#202832'
            },
            barStyle:{
                width:'6px',
                backgroundColor:'#344253'
            },
            price:{
                // isPositive:true,
                // btc:{
                //     high:0,
                //     low:0,
                //     order_price:0,
                //     p:0
                // }
                usdt:[],
                ut:[]
            },
            marketListUSDT:[
                // {
                //     icon:'$',
                //     type:'BTC',
                //     price:'11499.975',
                //     rise:'2.28',
                //     positive:true
                // }
            ],
            marketListUT:[
                // {
                //     icon:'',
                //     type:'BTC',
                //     price:'23499.975',
                //     rise:'2.28'
                // }
            ],
            mycoins:[
                // {
                //     plate_en:'btc',
                //     available:199,
                //     frozen:19,
                //     id:1003
                // }
            ],
            exchange:{
                orderType:'marketprice',
                balance:0,
                percent:0,
                amount:0,
                price:0
            },
            noticeList:[
                {
                    time:'2018-03-09',
                    notice_title:'2323',
                    notice_content:"2323"
                },
                {
                    time:'2018-03-09',
                    notice_title:'2323',
                    notice_content:"2323"
                },
                {
                    time:'2018-03-09',
                    notice_title:'2323',
                    notice_content:"2323"
                },
                {
                    time:'2018-03-09',
                    notice_title:'2323',
                    notice_content:"2323"
                }
            ],
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
            curDelegation:[],
            hisDelegation:[],
            realTimeDeal:{
                buy:[],
                sell:[]
            },
            realTimeDealList:[]
        }
    },
    components:{
      Topline:Topline,
      Navibar:Navibar,
      Foot:Foot,
      ScrollBar
    },
    computed:{
        allprice(){
            return this.exchange.price * this.exchange.amount
        },
        allcurprice(){
            if(this.price.usdt && this.price.usdt[0] && this.price.usdt[0].order_price){
                return this.price.usdt[0].order_price * this.exchange.amount
            }else{
                return 0
            }
        },
        curPrice(){
            if(this.price.usdt && this.price.usdt[0] && this.price.usdt[0].p){
                return Math.abs(this.price.usdt[0].p)
            }else{
                return 0
            }
        }
    },
    created(){
        this.getCurDelegate()
        this.getHisDelegate()
        this.getNotice()
        this.getAssetslist()
        this.userAccount()
    },
    mounted () {
        var self = this
        console.log(3333,self.realTimeDeal)
        // this.$options.sockets.onmessage = function(data){
        //     // console.log(JSON.parse(data.data))
        //     var res = JSON.parse(data.data)
        //     console.log(res)
        //     // console.log(555555,data.data.sb,JSON.parse(data.data.sb))
        //     self.normalizeCurPrice(res.price)
        //     self.normalizeRealTime(res.sb)
        //     // console.log(data)
        // }
        this.socket_1.onmessage = function(data){
            // console.log('原始ws数据',data)
            var res = JSON.parse(data.data)
            console.log(res)
            // console.log(555555,data.data.sb,JSON.parse(data.data.sb))
            self.normalizeCurPrice(res.price)
            self.normalizeRealTime(res.sb)
        }
        this.socket_2.onmessage = function(data){
            var res = JSON.parse(data.data)
            console.log(res)
            self.realTimeDealList = res
            // {processed_amount: "100.0000", order_price: "600.00", order_time: "2018-04-24 03:22:47"
        }
    },
    watch:{
        
    },
    methods:{
        normalizeRealTime(res){
            var self = this
            self.realTimeDeal.buy = []
            self.realTimeDeal.sell = []
            for(var i =0,imax = res.buy.length;i<imax;i++){
                var item = {}
                    item.allamount = res.buy[i].allamount
                    item.amount = res.buy[i].amount
                    item.order_price = res.buy[i].order_price
                    item.role = '买' + (i+1).toString()
                self.realTimeDeal.buy.push(item)
            }
            for(var i =0,imax = res.sell.length;i<imax;i++){
                var item = {}        
                    item.allamount = res.sell[i].allamount
                    item.amount = res.sell[i].amount
                    item.order_price = res.sell[i].order_price
                    item.role = '卖' + (i+1).toString()
                self.realTimeDeal.sell.push(item)
            }
        },
        normalizeCurPrice(res){
            var self = this
            this.price = res
            this.marketListUSDT = res.usdt
            this.marketListUT = res.ut
            for(var i in this.marketListUSDT){
                self.marketListUSDT[i].icon = '$'
                self.marketListUSDT[i].positive = self.marketListUSDT[i].p >=0?true:false
            }
            for(var i in this.marketListUT){
                self.marketListUT[i].icon = '$'
                self.marketListUT[i].positive = self.marketListUSDT[i].p >=0?true:false
            }
        },
        computeAmount(){
            // this.exchange.amount = (this.exchange.balance * (this.exchange.percent/100)).toFixed(0)
            if(this.exchange.price == 0){
                this.exchange.amount = 0 
                return
            }else{                
                if(this.exchange.orderType == 'limitprice'){
                    this.exchange.amount = (Math.floor(this.exchange.balance/this.exchange.price)).toFixed(0)
                }else if(this.exchange.orderType == 'marketprice'){
                    this.exchange.amount = this.price.usdt[0].order_price
                }
            }
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
                this.curDelegation = res.entrusts
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
                this.hisDelegation = res.entrusts
            }).catch(err => {

            })
        },
        // 新增委托
        addDelegate($event){
            console.log($event.currentTarget.value,this.exchange.orderType)
            const trade_type = $event.currentTarget.value == 'purchase'?1:2

            let reg = /\d*/
            if(this.exchange.amount < 0 || !reg.test(this.exchange.amount)){
                this.$message('交易数量大于等于0')
                this.exchange.amount = 0
                return
            }
            
            var price = this.exchange.orderType == 'limitprice'?this.exchange.price:this.price.usdt[0].order_price

            var type = this.exchange.orderType == 'limitprice'?0:1
            if(this.exchange.amount * price  > this.exchange.balance){
                this.$message('交易额超过当前账户余额')
                return
            }
            var data = {
                currency:'btc',                     //基础货币，货币符号 CNY,BTC，ETH，UT等
                order_amount:this.exchange.amount,  //订单数量
                order_price:Number(price),          //订单价格
                order_type:type,                    //订单类型，0 限价单，1市价单
                trade_currency:'btc',               //交易货币，货币符号 CNY,BTC，ETH，UT等
                trade_type:trade_type               //交易类型，0买单，1买单
            }
            api.addDelegate(data)
            .then(res => {
                if(res.error_code == 1000){
                    this.userAccount()
                    this.getCurDelegate()
                }
                this.$message(res.error_desc)
            }).catch(err => {

            })
        },
        // 取消委托
        cancelDelegate(row){
            console.log(row)
            var data = {
                order_id:row.id,
                currency:'btc'
            }
            api.cancelDelegate(data)
            .then(res => {
                this.$message(res.error_desc)
                this.getCurDelegate()
            }).catch(err => {
                this.$message('网络失败请重试')
            })
        },
        getNotice(){
            var data = {
                type:1
            }
            api.getNotice(data)
            .then(res => {
                console.log(res)
                if(res.error_code == 1000){
                    this.noticeList = res.data
                }else{
                    this.$message(res.error_desc)
                }
            }).catch(err => {

            })
        },
        getAssetslist(){
            var data = {}
            api.getAssetslist(data)
            .then(res=>{
                this.mycoins = res.assets_list
            }).catch(err => {

            })
        },
        // 提币
        getCoin(item){
            console.log(item)
            this.$router.replace({name:'coinoption',params: { dealId: item.id,type:2}})
        },
        // 冲币
        addCoin(item){
            console.log(item)
            this.$router.replace({name:'coinoption',params: { dealId: item.id,type:1}})
        },
        userAccount(){
            var data = {
                currency:'usdt'
            }
            api.userAccount(data)
            .then(res => {
                if(res.error_code == 1000){
                    this.exchange.balance = res.available
                }else{
                    this.$message(res.error_desc)
                }
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
    
    .rel1{
        width: 36px;
        display: inline-block;
        text-align: center;
        white-space:nowrap; 
        overflow: hidden;
    }
    .rel2{
        width: 70px;
        display: inline-block;
        text-align: center;
        white-space:nowrap; 
        overflow: hidden;
    }
    .rel3{
        width: 100px;
        display: inline-block;
        text-align: center;
        white-space:nowrap; 
        overflow: hidden;
    }
    .rel4{
        width: 80px;
        display: inline-block;
        text-align: center;
        white-space:nowrap; 
        overflow: hidden;
    }
   
    .rel4.rise{
        width: 80px;
        display: inline-block;
        color:#a4454b;
        text-align: center;
    }
    .rel4.fall{
        width: 80px;
        display: inline-block;
        color:#5ead6f;
        text-align: center;
    }
}

.mycoin-list{
    width: 100%;
    background: #191f27;
    color:#c2c3ca;
    line-height: 1.5;
    font-size: 10px;
    overflow: hidden;
    white-space:nowrap; 

    .rel1{
        width: 36px;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        white-space:nowrap; 
    }
    .rel2{
        width: 72px;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        white-space:nowrap; 
    }
    .rel3{
        width: 72px;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        white-space:nowrap; 
    }
    .rel4{
        width: 80px;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        white-space:nowrap; 
    }
    .get-coin{
        background-color:#344253;
        padding: 5px;
        color: #8e9aa9;
        border-radius: 0;
    }
    .add-coin{
        background-color:#495d75;
        padding: 5px;
        color: #8e9aa9;
        border-radius: 0;
        margin-left: 5px;
    }
}
.market-list-header{
    font-size: 12px;
    color:#384456;
    line-height: 1.5;
    height: 28px;
}
.pad15{
    padding: 0 15px;
}
.market-list{
    text-align: center;
}

.mycoins-table{
    padding:0 15px;
}
.notice-list{
    width: 100%;
    background: #191f27;
    overflow: hidden;
    white-space:nowrap; 
    color:#c2c3ca;
    list-style-type: none;
    padding-left:15px;
    .notice-squre{
        width: 20px;
        display: inline-block;
        text-align: center;
        padding-top: 3px;
        padding-bottom: 3px;
    }
    .notice-li{
        line-height: 1.5;
        font-size: 14px;
        padding-top: 3px;
        padding-bottom: 3px;
    }
}

.exchange-table{
    font-size: 12px;
}
.center-table{
    text-align: center;
}

#show-iframe{
    width: 100%;
    height: 100%;
}
</style>