<template>
    <div>
        <el-container class="fs-container">
            <el-aside class="leftside" style="width:370px;">
                <div class="inner-wrapper">
                    <el-container class="dash">
                        <el-aside class="left-pic"  style="width:88px;margin:23px 0;">
                            <img class="left-pic" :src="img == 'ETH'?imgshow:imghide"  alt=""/>

                        </el-aside>
                        <el-main class="right-word">
                            <div class="right-l1">{{curDuad}}  {{tradeCurrencyInfo.order_price}}</div>
                            <div class="right-l2">≈  {{(tradeCurrencyInfo.order_price*6.3).toFixed(2)}}CNY</div>
                            <div class="right-l3" :class="tradeCurrencyInfo.p>0?'green':'red'">{{curPrice}}%</div>
                            <div class="right-15">24H量 3842 {{img}}</div>
                            <div class="right-l4"  >高：{{tradeCurrencyInfo.high}} 低：{{tradeCurrencyInfo.low}}</div>
                        </el-main>
                        
                    </el-container>
                    <!-- 市场 -->
                    <div class="cur-price">
                        <div class="tabs-header">
                            <i :class="showMarket?'arrow-right el-icon-arrow-right i_roate':'arrow-right el-icon-arrow-right'" @click="toggleShowMarket"></i>
                            市场
                        </div>
                        <el-tabs type="border-card" class="market-table">
                            <el-tab-pane v-show="showMarket"  label="USDT">

                                <div class="market-list-header" >
                                    <span class="rel1"></span>
                                    <span class="rel2">币种</span>
                                    <span class="rel3">最新价</span>
                                    <span class="rel4">24h涨幅</span>
                                </div>
                                <div class="vuebar-element" v-bar="{preventParentScroll:true,scrollThrottle:50}"> <!-- el1 -->
                                    <div>
                                        <div class="market-list" :class="{'active':curIndex == index}" @click="changeDuadByLine(item,index)" v-for="(item,index) in marketListUSDT" :key="index">
                                            <span class="rel1">
                                                <!-- {{item.pic}} -->
                                                <img  class="tiny-icon" :src="item.pic"/>
                                            </span>
                                            <span class="rel2">
                                                {{item.name.toUpperCase()}}
                                            </span>
                                            <span class="rel3">{{item.order_price}}</span>
                                            <span class="rel4" :class="item.positive?'fall':'rise'">{{Math.abs(item.p)}}%</span>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <!-- <el-tab-pane label="UT">
                                <div class="market-list-header" >
                                    <span class="rel1"></span>
                                    <span class="rel2">币种</span>
                                    <span class="rel3">最新价</span>
                                    <span class="rel4">24h涨幅</span>
                                </div>
                                <div class="vuebar-element" v-bar="{preventParentScroll:true,scrollThrottle:50}">
                                    <div> 
                                        
                                        <div class="market-list" v-for="(item,index) in marketListUT"  :key="index">
                                            <span class="rel1">{{item.pic}}</span>
                                            <span class="rel2">{{item.name.toUpperCase()}}</span>
                                            <span class="rel3">{{item.order_price}}</span>
                                            <span class="rel4" :class="item.positive?'rise':'fall'">{{item.p}}%</span>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane> -->
                        </el-tabs> 
                   </div>

                    <!-- 交易 -->
                    <div class="exchange">
                        <div class="tabs-header">
                            <i :class="showDeal?'arrow-right el-icon-arrow-right i_roate':'arrow-right el-icon-arrow-right'" @click="toggleShowDeal"></i>
                            交易
                        </div>
                        <el-tabs  type="border-card" v-model="exchange.orderType" class="market-table"> 
                            <el-tab-pane  v-show="showDeal"  name="limitprice" label="限价">
                                <div class="tips">
                                    可用：{{exchange.balance}} USDT
                                </div>
                                <div class="deal-form">
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <div class="amount-label">
                                                价格
                                            </div>
                                            <el-input class="amount-input" type="number" v-model.number="exchange.limitPriceDeal.price" @keyup.native="num(exchange.limitPriceDeal.price)">
                                                <template slot="append">{{currency}}</template>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="12">
                                            <div class="amount-label">
                                                数量
                                            </div>
                                            <el-input class="amount-input" type="number" v-model.number="exchange.limitPriceDeal.amount" @keyup.native="amount(exchange.limitPriceDeal.amount)">
                                                <template slot="append">{{tradeCurrency}}</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-slider 
                                    v-model="exchange.limitPriceDeal.percent" 
                                    :show-tooltip="false"
                                    :show-stops="true"
                                    min.number="0"
                                    step.number="5"
                                    @change="computeLimitAmount"
                                    ></el-slider>
                                    <div class="amount-tips">
                                    交易额:{{allprice}} USDT
                                    </div>
                                    <div class="btn-wrapper">
                                        <el-button 
                                        type="purchase" 
                                        value="purchase" 
                                        @click="addDelegate($event)">买入</el-button>
                                        <el-button 
                                        type="sell" 
                                        value="sell"  
                                        @click="addDelegate($event)">卖出</el-button>
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
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <div class="amount-label">
                                                数量
                                            </div>
                                            <el-input :class="exchange.marketPriceDeal.buyDisable?'amount-input btn_disabled':'amount-input'" type="number"
                                            name="buy"  v-model.number="exchange.marketPriceDeal.price" 
                                            :disabled="exchange.marketPriceDeal.buyDisable"
                                            @focus="getFocus"
                                            @keyup.native="getBuyKeyup"
                                            placeholder="买入交易额" >
                                                <template slot="append">{{currency}}</template>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="12">
                                            <div class="amount-label">
                                                数量
                                            </div>
                                            <el-input :class="exchange.marketPriceDeal.sellDisable?'amount-input btn_disabled':'amount-input'"  class="amount-input" type="number"
                                            name="sell"  
                                            placeholder="卖出数量" 
                                            :disabled="exchange.marketPriceDeal.sellDisable"
                                            @focus="getFocus"
                                            @keyup.native="getSellKeyup"
                                            v-model.number="exchange.marketPriceDeal.amount">
                                                <template slot="append">{{tradeCurrency}}</template>
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-slider 
                                    v-model="exchange.marketPriceDeal.percent"
                                    :show-tooltip="false"
                                    :show-stops="true"
                                    min.number="0"
                                    step.number="5"
                                    @change="computeMarketAmount"
                                    ></el-slider>
                                    <div class="btn-wrapper">
                                        <el-button :class="exchange.marketPriceDeal.buyDisable?'btn_disabled':''" type="purchase"
                                        value="purchase" 
                                        @click="addDelegate($event)"
                                        :disabled="exchange.marketPriceDeal.buyDisable">买入</el-button>
                                        <el-button :class="exchange.marketPriceDeal.sellDisable?'btn_disabled':''" type="sell"
                                        value="sell"  
                                        @click="addDelegate($event)"
                                        :disabled="exchange.marketPriceDeal.sellDisable">卖出</el-button>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs> 
                    </div>


                    <!-- 持有 -->
                    <div class="mycoins">
                        <div class="normal-header">
                            <i :class="showMyCoin?'arrow-right el-icon-arrow-right i_roate':'arrow-right el-icon-arrow-right'" @click="toggleShowMyCoin"></i>
                            持有
                        </div>
                        <div v-show="showMyCoin" class="market-list-header pad15" >
                            <span class="rel1">币种</span>
                            <span class="rel2">可用</span>
                            <span class="rel3">冻结</span>
                            <span class="rel4">操作</span>
                        </div>
                        <div v-show="showMyCoin" class="mycoins-table">
                            <div class="vuebar-element" 
                            v-bar="{preventParentScroll:true,scrollThrottle:50}">
                                <div >
                                    <div class="mycoin-list" @click="changeDuadByLineAsset(item,index)" v-for="(item,index) in mycoins" :key="index">
                                        <span class="rel1">{{item.currency.toUpperCase()}}</span>
                                        <span class="rel2">{{item.available}}</span>
                                        <span class="rel3">{{item.frozen}}</span>
                                        <span class="rel4">
                                            <el-button  class="add-coin" @click="addCoin(item,index)" type="text" size="small">充币</el-button>
                                            <el-button class="get-coin" @click="getCoin(item,index)" type="text" size="small">提币</el-button>
                                        </span>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>


                    <div class="boardcast">
                        <div class="normal-header">
                            <i :class="showNotice?'arrow-right el-icon-arrow-right i_roate':'arrow-right el-icon-arrow-right'" @click="toggleShowNotice"></i>
                            公告
                            <router-link class="normal-header-more" to="/notice">更多</router-link>
                        </div>
                        <div v-show="showNotice" class="vuebar-element" v-bar="{preventParentScroll:true,scrollThrottle:50}">
                            <div >
                                <ul class="notice-list">
                                    <li class="notice-li" @click="jumpNotice(item)" v-for="(item,index) in noticeList" :key="index">
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
                         <i :class="showKline?'arrow-right el-icon-arrow-right i_roate':'arrow-right el-icon-arrow-right'" @click="toggleShowKline"></i>
                            图表
                            <el-select v-model="curDuad" style="width:140px;" @change="changeDuad">
                                <el-option
                                v-for="item in currencyOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </div>
                    <div style="height:480px;" v-show="showKline">
                       <iframe id="show-iframe"  frameborder=0 name="showHere" scrolling=auto :src="iframUrl"></iframe> 
                    </div>
                </div>
                <div class="exchange-table">
                    <div class="exchange-table-header cur-delegation">
                        <i :class="showCurDelegate?'arrow-right el-icon-arrow-right i_roate':'arrow-right el-icon-arrow-right'" @click="toggleShowCurDelegate"></i>
                            当前委托
                    </div>
                    <el-table v-show="showCurDelegate" class="center-table"
                    :data="curDelegation"
                    ref="curDelegateTable"
                    style="width: 100%">
                        <el-table-column
                            prop="time"
                            label="时间"
                            width="180"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="duad"
                            label="交易对"
                            >
                            <template slot-scope="scope">
                                {{scope.row.duad.toUpperCase()}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="direction"
                            label="方向">
                            <template slot-scope="scope">
                                <span 
                                :class="scope.row.direction == 1?'buy-direction':'sell-direction'">
                                    {{scope.row.direction == 1?"买入":"卖出"}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            :label="priceLabel">
                        </el-table-column>
                        <el-table-column
                            prop="number"
                            :label="amountLabel">
                        </el-table-column>
                        <el-table-column
                            prop="total"
                            label="委托总额(USDT)">
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
                        <i :class="showHisDelegate?'arrow-right el-icon-arrow-right i_roate':'arrow-right el-icon-arrow-right'" @click="toggleShowHisDelegate"></i>
                            历史委托
                    </div>
                    <el-table v-show="showHisDelegate" 
                    ref="hisDelegateTable"
                    @expand-change="expandLine" 
                    class="center-table"
                    :data="hisDelegation"
                    style="width: 100%">
                        <el-table-column
                            prop="time"
                            label="时间"
                            width="180"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="duad"
                            label="交易对"
                            >
                            <template slot-scope="scope">
                                {{scope.row.duad.toUpperCase()}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="direction"
                            label="方向">
                            <template slot-scope="scope" >
                                <span 
                                :class="scope.row.direction == 1?'buy-direction':'sell-direction'">
                                    {{scope.row.direction == 1?"买入":"卖出"}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            
                            :label="priceLabel">
                            <template slot-scope="scope">
                                <span >
                                    {{scope.row.price == 0?"市价":scope.row.price}}
                                </span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column
                            prop="number"
                            label="数量">
                        </el-table-column> -->
                        <el-table-column
                            prop="number"
                            label="委托量">
                        </el-table-column>
                        <el-table-column
                            prop="deal"
                            :label="dealLabel">
                        </el-table-column>
                        <el-table-column
                            prop="average_price"
                            label="成交均价">
                        </el-table-column>
                        <el-table-column
                            prop="status_name"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            type="expand"
                            prop=""
                            label="操作">
                            <template slot-scope="props">
                                <div class="details">
                                    <ul class="details_title">
                                        <li>时间</li>
                                        <li>{{priceLabel}}</li>
                                        <li>{{amountLabel}}</li>
                                        <li>{{turnoverLabel}}</li>
                                        <li>手续费</li>
                                    </ul>
                                    <ul v-if="!props.row.loading" v-for="(item,index) in props.row.detailList" :key="index" class="details_section">
                                        <li>{{item.time}}</li>
                                        <li>{{item.price}}</li>
                                        <li>{{item.number}}</li>
                                        <li>{{item.total}}</li>
                                        <li>{{item.fee}} {{item.trade_type == 1?item.trade_currency.toUpperCase():"USDT"}}</li>
                                    </ul>
                                    <div v-if="!props.row.loading && props.row.detailList.length ==0" class="details_loading">
                                        暂无数据
                                    </div>
                                    <div v-if="props.row.loading" class="details_loading">
                                        <i class="el-icon-loading"></i>
                                    </div>
                                </div>
                            </template>
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
                    <el-col :span="16" style="padding-right:2px;">
                        <div class="exchange-table" style="min-height:691px;">
                            <div class="exchange-table-header cur-delegation">
                                <i :class="showDeep?'arrow-right el-icon-arrow-right i_roate':'arrow-right el-icon-arrow-right'" @click="toggleShowDeep"></i>
                                    委托量
                            </div>
                            <el-row v-show="showDeep">
                                <el-col :span="12">
                                    <el-table class="center-table"
                                    ref="realTimeBuy"
                                    :data="realTimeDeal.buy"
                                    @cell-click="changePrice"
                                    style="width: 100%">
                                        <el-table-column
                                            prop="role"
                                            label="买盘"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="amount"
                                            :label="amountLabel"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="allamount"
                                            :label="allAmountLabel">
                                        </el-table-column>
                                        <el-table-column
                                            prop="order_price"
                                            :label="priceLabel">
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                                <el-col :span="12">
                                    <el-table class="center-table"
                                    :data="realTimeDeal.sell"
                                    @cell-click="changePrice"
                                    ref="realTimeSell"
                                    style="width: 100%">
                                        <el-table-column
                                            prop="order_price"
                                            :label="priceLabel"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="allamount"
                                            :label="allAmountLabel">
                                        </el-table-column>
                                        <el-table-column
                                            prop="amount"
                                            :label="amountLabel"
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
                                <i :class="showRealTime?'arrow-right el-icon-arrow-right i_roate':'arrow-right el-icon-arrow-right'" @click="toggleShowRealTime"></i>
                                    实时成交
                            </div>
                            <el-table v-show="showRealTime" class="exchange-table center-table"
                            :data="realTimeDealList"
                            ref="realTimeDeal"
                            style="width: 100%">
                                <el-table-column
                                    prop="order_time"
                                    label="时间"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="direction"
                                    label="方向">
                                    <template slot-scope="scope">
                                        <span 
                                        :class="scope.row.direction == 1?'buy-direction':'sell-direction'">
                                            {{scope.row.direction == 1?"买入":"卖出"}}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="order_price"
                                    :label="priceLabel">
                                </el-table-column>
                                <el-table-column
                                    prop="processed_amount"
                                    :label="amountLabel">
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
            // 折叠开关
            showMarket:true,
            showDeal:true,
            showMyCoin:true,
            showNotice:false,
            showKline:true,
            showCurDelegate:false,
            showHisDelegate:false,
            showDeep:true,
            showRealTime:true,
            imgshow:require('@icon64/eth.png'),
            imghide:require('@icon64/btc.png'),
            // 定时器
            curDelegateTimmer:null,
            hisDelegateTimmer:null,
            getAssetsTimmer:null,
            // 当前市场列表选择的项下标
            curIndex : 0,
            curIndexAsset:-1,
            // 当前目标货币
            curDuad:'',
            currency:'',
            tradeCurrency:'',
            tradeCurrencyInfo:{
                name:'',
                order_price:0,
                p:0,
                high:0,
                low:0,
                star:0
            },
            socket_1:null,
            socketUrl:'',
            barContainerStyle:{
                width:'6px',
                backgroundColor:'#202832'
            },
            barStyle:{
                width:'6px',
                backgroundColor:'#344253'
            },
            price:{
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
                orderType:'limitprice',
                focusChoose:'buy',
                balance:0,
                percent:0,
                // price:0,
                marketPriceDeal:{
                    percent:0,
                    amount:0,
                    price:0
                },
                limitPriceDeal:{
                    percent:0,
                    amount:0,
                    price:0,
                    buyDisable:false,
                    sellDisable:false
                }
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
            currencyOptions:[
                {
                    value:'BTC/USDT',
                    label:'BTC/USDT'
                },
                {
                    value:'ETH/USDT',
                    label:'ETH/USDT'
                }
            ],
            curDelegation:[],
            hisDelegation:[],
            realTimeDeal:{
                buy:[],
                sell:[]
            },
            realTimeDealList:[],
            historydatamd5:''
        }
    },
    components:{
      ScrollBar
    },
    computed:{
        allprice(){
            return (this.exchange.limitPriceDeal.price * this.exchange.limitPriceDeal.amount).toFixed(4)
        },
        iframUrl(){
            return 'http://frontend.sy.sxurl.cn/kline/versiontwo?from=' + this.currency +'&to=' + this.tradeCurrency + '&1524016170='
        },
        curPrice(){
            if(this.tradeCurrencyInfo){
                console.log(7878787878,this.tradeCurrencyInfo)
                return Math.abs(this.tradeCurrencyInfo.p)
            }else{
                return 0
            }
        },
        priceLabel(){
            return '价格(' + this.currency + ')'
        },
        dealLabel(){
            return '已成交(' + this.tradeCurrency + ')'
        },
        amountLabel(){
            return '数量('+ this.tradeCurrency +')'
        },
        allAmountLabel(){
            return '累计('+ this.tradeCurrency +')'
        },
        turnoverLabel(){
            return '成交额('+ this.currency +')'
        },
        img(){
            return this.tradeCurrency
        }
    },
    created(){
        console.log(888888,this.$route.query.tradeCurrency,this.$route.query.tradeCurrency != ('BTC'||'ETH'),this.$route.query.base != 'USDT')
        if((this.$route.query.tradeCurrency != 'BTC'&&
            this.$route.query.tradeCurrency != 'ETH')||
            this.$route.query.base != 'USDT')
        {
            this.$router.replace({path:'/exchange/coinexchange'})
        }
        // if(this.$route.query.base && (this.$route.query.base != 'USDT')){

        // }
        // this.$router.replace({path:'/exchange/coinexchange'})
    },
    mounted () {
        var self = this
        this.getDuad()
        this.curDelegateTimmer = setInterval(function(){
            self.getCurDelegate()
        },5000)
        this.hisDelegateTimmer = setInterval(function(){
            self.getHisDelegate()
        },5000)
        this.getAssetslist()
        this.getAssetsTimmer = setInterval(function(){
            self.getAssetslist()
        },5000)
        this.getNotice()
        this.userAccount()
    },
    watch:{
        
    },
    beforeDestroy(){
        var self = this
        clearInterval(self.curDelegateTimmer)
        clearInterval(self.hisDelegateTimmer)
        clearInterval(self.getAssetsTimmer)
    },
    methods:{
        changePrice(row, column, cell, event){
            if(row && row.order_price && this.exchange.orderType == 'limitprice'){
                this.exchange.limitPriceDeal.price = row.order_price
            }
        },
        // 重置比表货币
        getDuad(){
            // 获取当前货币和交易对
            this.tradeCurrency = this.$route.query.tradeCurrency ? this.$route.query.tradeCurrency:(this.currencyOptions[0].value).split('/')[0]
            this.currency = this.$route.query.base ? this.$route.query.base:(this.currencyOptions[0].value).split('/')[1]
            this.curDuad = this.tradeCurrency + '/' + this.currency

            this.getWsByCurrency()
            this.getCurDelegate()
            this.getHisDelegate()
        },
        // 切换币种
        changeDuad(e){
            console.log(e)
            this.tradeCurrency = this.curDuad.split('/')[0]
            this.currency = this.curDuad.split('/')[1]
            this.$router.replace({path:'/exchange/coinexchange',query:{tradeCurrency:this.tradeCurrency,base:this.currency}})
            this.getWsByCurrency()
            // this.getCurDelegate()
            // this.getHisDelegate()
        },

        changeDuadByLine(item,index){
            this.curIndex = index
            this.tradeCurrency = (item.currency || item.name).toUpperCase()
            this.curDuad = this.tradeCurrency + '/' + this.currency
            this.getWsByCurrency()
            this.getCurDelegate()
            this.getHisDelegate()     
        },
        changeDuadByLineAsset(item){
            this.curIndexAsset = index
            this.tradeCurrency = (item.currency || item.name).toUpperCase()
            this.curDuad = this.tradeCurrency + '/' + this.currency
            this.getWsByCurrency()
            this.getCurDelegate()
            this.getHisDelegate()
        },
        // 根据当前货币获取接口
        getWsByCurrency(){
            console.log('切换货币接口获取1111111111111')
            var self = this
            var data = {
                currency:this.currency,
                trade_currency:this.tradeCurrency
            }
            console.log('切换货币1111111111111',data.currency,data.trade_currency)
            api.getWsByCurrency(data)
            .then(res =>{
                console.log(res,787887)
                if(res.error_code == 1000){    
                    this.socketUrl =  'ws://' + res.port_info.ip + ':' + res.port_info.pan_port
                    console.log(99999,this.socketUrl)
                    this.initWs()
                }
            }).catch(err => {})
        },
        initWs(){
            var self = this
            if(this.socket_1){
                this.socket_1.close()
                this.socket_1 = null
            }
            this.socket_1 = new WebSocket(this.socketUrl)
            this.socket_1.onmessage = function(data){
                
                var res = JSON.parse(data.data)
                console.log('ws接口：', res)
                self.normalizeCurPrice(res)
                self.normalizeRealTime(res.sb)
                self.realTimeDealList = res.nb
                // 如果有则赋值到市价交易默认值
                if(res.sbprice && res.sbprice.order_price){
                    self.exchange.limitPriceDeal.price = res.sbprice.order_price
                }
            }
        },
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
            this.tradeCurrencyInfo = res.one
            this.marketListUSDT = res.price.usdt
            this.marketListUT = res.price.ut
            for(var i in this.marketListUSDT){
                self.marketListUSDT[i].icon = '$'
                self.marketListUSDT[i].positive = self.marketListUSDT[i].p >=0?true:false
                // this.marketListUSDT.forEach((o,i)=>{
                if(self.marketListUSDT[i].name.toUpperCase() == this.tradeCurrency){
                    this.curIndex = i
                }
                // })
            }
            for(var i in this.marketListUT){
                self.marketListUT[i].icon = '$'
                self.marketListUT[i].positive = self.marketListUSDT[i].p >=0?true:false
            }
        },
        computeLimitAmount(){
            console.log(this.exchange.limitPriceDeal.price,this.exchange.limitPriceDeal.percent)
            if(this.exchange.limitPriceDeal.price == 0){
                this.exchange.limitPriceDeal.amount = 0 
                return
            }else{                
                this.exchange.limitPriceDeal.amount = (Math.floor(this.exchange.balance/this.exchange.limitPriceDeal.price * this.exchange.limitPriceDeal.percent/100))
            }
            console.log('限价交易：',this.exchange.limitPriceDeal.amount)
        },
        getFocus(e){
            this.exchange.focusChoose = e.target.name
        },
        getBuyKeyup(e){
            if (!/^\d*\.?\d{0,8}$/.test(Number(e.target.value))) {
                const num=Number(e.target.value).toFixed(9)
                const numTwo=num.substring(0,num.lastIndexOf('.')+9)
                this.exchange.marketPriceDeal.price = numTwo
            }
            if(Number(e.target.value) > 0){
                this.exchange.marketPriceDeal.buyDisable = false
                this.exchange.marketPriceDeal.sellDisable = true
            }else{
                this.exchange.marketPriceDeal.sellDisable = false
            }
        },
        getSellKeyup(e){
            if (!/^\d*\.?\d{0,4}$/.test(Number(e.target.value))) {
                const num=Number(e.target.value).toFixed(5)
                const numTwo=num.substring(0,num.lastIndexOf('.')+5)
                this.exchange.marketPriceDeal.amount = numTwo
            }
            if(Number(e.target.value) > 0){
                this.exchange.marketPriceDeal.buyDisable = true
                this.exchange.marketPriceDeal.sellDisable = false
            }else{
                this.exchange.marketPriceDeal.buyDisable = false
            }
        },
        computeMarketAmount(){
            if(this.exchange.focusChoose == 'sell'){
                // 市价卖
                this.exchange.marketPriceDeal.amount = (this.exchange.marketPriceDeal.percent * this.exchange.balance).toFixed(2)
                if(this.exchange.marketPriceDeal.amount > 0){
                    this.exchange.marketPriceDeal.buyDisable = true
                }else{
                    this.exchange.marketPriceDeal.buyDisable = false
                }
                return
            }else if(this.exchange.focusChoose == 'buy'){
                // 市价买
                this.exchange.marketPriceDeal.price = (this.exchange.marketPriceDeal.percent * this.exchange.balance).toFixed(2)
                if(this.exchange.marketPriceDeal.price > 0){
                    this.exchange.marketPriceDeal.sellDisable = true
                }else{
                    this.exchange.marketPriceDeal.sellDisable = false
                }
            }
            console.log('市价交易：',this.exchange.marketPriceDeal.amount == 0,this.exchange.marketPriceDeal.price == 0)
        },
        computePercent(){
            this.exchange.percent = Math.floor(this.exchange.amount/this.exchange.balance*100)
        },
        // 获取当前委托
        getCurDelegate(){
            var data = {
                currency:this.currency,
                trade_currency:this.tradeCurrency,
                page:1
            }
            api.curDelegate(data)
            .then(res => {
                // console.log("当前委托",res)
                this.curDelegation = res.entrusts
            }).catch(err => {

            })
        },
        // 获取历史委托
        getHisDelegate(){
            var data = {
                currency:this.currency,
                trade_currency:this.tradeCurrency,
                page:1
            }
            api.hisDelegate(data)
            .then(res => {
                console.log("历史委托",res)
                if(this.historydatamd5 != res.md5_entrusts){
                    this.hisDelegation = res.entrusts
                    this.historydatamd5 = res.md5_entrusts
                }
            }).catch(err => {

            })
        },
        // 新增委托
        addDelegate($event){
            console.log($event.currentTarget.value,this.exchange.orderType)
            const trade_type = $event.currentTarget.value == 'purchase'?1:2

            let reg = /\d*/
            // if(this.exchange.amount < 0 || !reg.test(this.exchange.amount)){
            //     this.$message('交易数量大于等于0')
            //     this.exchange.amount = 0
            //     return
            // }
            
            
            var deal = this.exchange.orderType == 'limitprice'?this.exchange.limitPriceDeal:this.exchange.marketPriceDeal

            var orderType = this.exchange.orderType == 'limitprice'?0:1
            // 如果市价
            if(this.exchange.orderType == 'limitprice'){
                deal = this.exchange.limitPriceDeal
            }else{
                deal = JSON.parse(JSON.stringify(this.exchange.marketPriceDeal))
                // 如果是买，将price字段变为amount 
                if(trade_type == 1){
                    deal.amount = deal.price
                    deal.price = 0
                }else if(trade_type == 2){
                    deal.price = 0
                }
            }


            // 如果是限价，检查总额是否超出
            if(this.exchange.orderType == 0 && this.exchange.limitPriceDeal.amount * this.exchange.limitPriceDeal.price  > this.exchange.balance){
                this.$message('交易额超过当前账户余额')
                return
            }
            var data = {
                order_amount:deal.amount,  //订单数量
                order_price:Number(deal.price),          //订单价格
                order_type:orderType,                    //订单类型，0 限价单，1市价单
                currency:this.currency,                 //基础货币，货币符号 CNY,BTC，ETH，UT等
                trade_currency:this.tradeCurrency,     //交易货币，货币符号 CNY,BTC，ETH，UT等
                trade_type:trade_type               //交易类型，0买单，1买单
            }
            api.addDelegate(data)
            .then(res => {
                console.log(data,1212)
                if(res.error_code == 1000){
                    this.userAccount()
                    this.getCurDelegate()
                    // 如果此次是限价交易，则重新获取一次当前价格
                    if(orderType == 0){
                        this.exchange.limitPriceDeal.price = this.tradeCurrencyInfo.order_price
                    }
                    this.$message({
                        message:res.error_desc,
                        type:'success',
                        duration: 1000
                    })
                }
            }).catch(err => {

            })
        },
        // 取消委托
        cancelDelegate(row){
            console.log(row,1245)
            var data = {
                order_id:row.id,
                order_type:row.order_type,
                currency:row.currency,
                trade_currency:row.trade_currency
            }
            api.cancelDelegate(data)
            .then(res => {
                this.$message(res.error_desc)
                this.getCurDelegate()
            }).catch(err => {})
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
                }
            }).catch(err => {

            })
        },
        getAssetslist(){
            var data = {}
            api.getAssetslist(data)
            .then(res=>{
                if(res.error_code == 1000){
                    this.mycoins = res.assets_list
                }
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
                currency:this.currency
            }
            api.userAccount(data)
            .then(res => {
                if(res.error_code == 1000){
                    this.exchange.balance = res.available
                }
            }).catch(err => {

            })
        },
        jumpNotice(item){
            this.$router.push({path:'/notice/detail',query:{id:item.notice_id}})
        },
        expandLine(row, expandedRows){
            var self = this
            if(row.detailList && row.detailList.length >= 0){
                return
            }
            this.$set(row,'loading',true)
            var data = {
                order_id:row.id,
                currency:row.currency,
                trade_currency:row.trade_currency,
                trade_type:row.direction
            }
            api.orderDetail(data)
            .then(res => {
                console.log(res,12342234)
                if(res.error_code == 1000){  
                    this.$set(row,'detailList',res.entrusts)
                    this.$set(row,'loading',false)
                    console.log(row,expandedRows)
                }
            }).catch(err => {})
        },
        // 切换
        toggleShowMarket(){
            this.showMarket = !this.showMarket
        },
        toggleShowDeal(){
            this.showDeal = !this.showDeal
        },
        toggleShowMyCoin(){
            this.showMyCoin = !this.showMyCoin
        },
        toggleShowKline(){
            this.showKline = !this.showKline
        },
        toggleShowCurDelegate(){
            this.showCurDelegate = !this.showCurDelegate
            this.$nextTick(() =>{
                this.$refs.curDelegateTable.doLayout()
            })
        },
        toggleShowHisDelegate(){
            this.showHisDelegate = !this.showHisDelegate
            this.$nextTick(() =>{
                this.$refs.hisDelegateTable.doLayout()
            })
        },
        toggleShowDeep(){
            this.showDeep = !this.showDeep
            this.$nextTick(() =>{
                this.$refs.realTimeBuy.doLayout()
                this.$refs.realTimeSell.doLayout()
            })
        },
        toggleShowRealTime(){
            this.showRealTime = !this.showRealTime
            this.$nextTick(() =>{
                this.$refs.realTimeDeal.doLayout()
            })
        },
        toggleShowNotice(){
            this.showNotice = !this.showNotice
        },
        //限价价格只能输入两位小数
        num(e){
            console.log(e);
            if(!e) return
            if(!/^\d*\.?\d{0,2}$/.test(e)){
                const num=Number(e).toFixed(3)
                const numTwo=num.substring(0,num.lastIndexOf('.')+3)
                 this.exchange.limitPriceDeal.price = numTwo
            }
           
        },
        //限价数量只能输入四位小数
        amount(e){
            if(!e) return
            if (!/^\d*\.?\d{0,4}$/.test(e)) {
                const num=Number(e).toFixed(5)
                const numTwo=num.substring(0,num.lastIndexOf('.')+5)
                this.exchange.limitPriceDeal.amount = numTwo
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.market-table{
    background-color: #191f27;
    font-size: 14px;
    color: #8d9fb8;
    position: relative;
}
.vuebar-element {
  height: 177px;
  width: 100%;
  background: #191f27;
  transform: rotate3d(0,0,0,0);
}
.market-list-header,
.market-list{
    width: 100%;
    background: #191f27;
    // overflow: hidden;
    white-space:nowrap; 
    
    line-height: 1.5;
    
    .rel1{
        width: 36px;
        display: inline-block;
        text-align: center;
        white-space:nowrap; 
        overflow: hidden;
        vertical-align: top;
        padding-top: 9px;
        padding-left: 15px;
    }
    .rel2{
        width: 80px;
        display: inline-block;
        text-align: center;
        white-space:nowrap; 
        overflow: hidden;
    }
    .rel3{
        width:85px;
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
        // background: url('~@/assets/img/red_reduce.png') 15% 50% no-repeat;
        // background-size:8px;
        // font-weight: bold;
    }
    .rel4.rise::before{
        content: '-';
        font-size: 14px;
    }
    .rel4.fall{
        width: 80px;
        display: inline-block;
        color:#5ead6f;
        text-align: center;
        // background: url('~@/assets/img/green_add.png') 0 50% no-repeat;
        // background-size:8px 8px; 
        // font-weight: bold;
    }
    .rel4.fall::before{
        content: '+';
        font-size: 14px;
    }
}
.market-list{
    height: 33px;line-height: 33px;
}
.market-list:hover,
.mycoin-list:hover{
    background: #232d39;
}
.market-list.active{
    background: #232d39;
}
.mycoin-list{
    width: 100%;
    margin-bottom: 10px;
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
        width: 80px;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        white-space:nowrap; 
    }
    .rel3{
        width: 80px;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        white-space:nowrap; 
    }
    .rel4{
        width: 88px;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        white-space:nowrap; 
        padding-top: 4px;
    }
    .get-coin{
        width: 36px;
        height: 21px;
        background-color:#344253;
        color: #8e9aa9;
        border-radius: 0;
        text-align: center;
        margin-left: 0px;
        padding: 0;
    }
    .add-coin{
        width: 36px;
        height: 21px;
        background-color:#495d75;
        color: #8e9aa9;
        border-radius: 0;
        text-align: center;
        padding: 0;
    }
}

.market-list-header{
    font-size: 12px;
    color:#67778c;
    line-height: 30px;;
    height: 30px;
}
.pad15{
    padding: 0 15px;
    margin-bottom: 10px;
}
.market-list{
    text-align: center;
    font-size:12px;
}

.mycoins-table{
    padding:0 15px;
}
.notice-list{
    width: 100%;
    background: #191f27;
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
    color:#c2c3ca;
    list-style-type: none;
    padding-left:12px;
    padding-right: 12px;
    .notice-squre{
        width: 20px;
        display: inline-block;
        text-align: center;
        padding-top: 3px;
        padding-bottom: 3px;
    }
    .notice-li{
        font-size: 12px;
        padding-top:3px;
        padding-bottom: 3px;
        overflow: hidden;
        white-space:nowrap; 
        text-overflow: ellipsis;
        cursor: pointer;
    }
    .notice-li:first-child{
        margin-top: 18px!important;
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
.i_roate{
    transform:rotate(90deg)
}
.normal-header-more{color:#3f4e62;font-size:12px;float:right;width:auto;height:40px;line-height:40px;margin-right:20px;}
.details{
    width:100%;
    background:#151922;
    .details_title{overflow: hidden;
        li{list-style: none;width: 20%;height: 45px;line-height: 45px;float: left;color: #8d9fb8;text-align: center;}
    }
    .details_section{overflow: hidden;
        li{list-style: none;width: 20%;height: 45px;line-height: 45px;float: left;color: #f6f9ff;text-align: center;}
    }
    .details_loading{
        text-align: center;
        padding: 15px 0;
    }
}
.tiny-icon{
    width: 16px;
    height: 16px;
    display: block;
}
.imgshow{display: block!important;}
.imghide{display: none!important;}
.amount-input{font-size:12px !important}
.btn_disabled{opacity:0.3}
</style>