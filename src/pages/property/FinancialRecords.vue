<template>
    <!-- 交易记录 -->
    <div class="record" style="width: 1200px;height: 940px;">
      <div class="sjx_main">
       <div class="sjx_section">
         <div class="section_title">资产中心<i class="el-icon-arrow-right"></i><span>财务记录</span></div>
         <div class="sjx_btn">
           <div class="btn_section">
             <p v-for="(item,index) in arr" :key="index" @click="toggle(index)" :class="{active:index == active}">{{item}}</p>
           </div>
         </div>
         <!--充币内容-->
         <div v-if="active==0" class="charge_section" >
           <ul class="charge_title">
             <li>时间</li>
             <li>币种</li>
             <li>数量</li>
             <li>状态</li>
           </ul>

           <ul class="charge_title charge" v-for="(item,index) in rechargeRecordList" :key="index">
             <li>{{item.add_time}}</li>
             <li>{{item.currency}}</li>
             <li>{{item.number}}</li>
             <li>{{item.log_status}}</li>
           </ul>
          
           <!-- <ul class="charge_title charge">
             <li>2018-03-01 09:30:05</li>
             <li>USDT</li>
             <li>156.80000000</li>
             <li>已完成</li>
           </ul>

           <ul class="charge_title charge">
             <li>2018-03-01 09:30:05</li>
             <li>USDT</li>
             <li>156.80000000</li>
             <li style="color: #5d63f5;">TSID查询</li>
           </ul> -->
         </div>
         <!--提币内容-->
         <div v-if="active==1" class="charge_section">
           <ul class="charge_title charge_title2">
             <li>时间</li>
             <li>币种</li>
             <li>提币数量</li>
             <li>手续费</li>
             <li>到账数量</li>
             <li>状态</li>
           </ul>

          <ul class="charge_title charge" v-for="(item,index) in rechargeRecordList" :key="index">
             <li>{{item.add_time}}</li>
             <li>{{item.currency}}</li>
             <li>{{item.number_withdraw}}</li>
             <li>{{item.fee}}</li>
             <li>{{item.number_account}}</li>
             <li>{{item.log_status}}</li>
           </ul>
           <!-- <ul class="charge_title charge charge_title2">
             <li>2018-03-01 09:30:05</li>
             <li>USDT</li>
             <li>156.80000000</li>
             <li>1.00000000</li>
             <li>156.80000000</li>
             <li>已完成</li>
           </ul>

           <ul class="charge_title charge charge_title2">
             <li>2018-03-01 09:30:05</li>
             <li>USDT</li>
             <li>156.80000000</li>
             <li>1.00000000</li>
             <li>156.80000000</li>
             <li style="color: #5d63f5;">TSID查询</li>
           </ul> -->
         </div>
       </div>
    </div>
    </div>
</template>

<script>
import { api } from '@/static/api'
export default {
    name:'FinancialRecords',
    data(){
      return{
        active:0,
        arr:[
          "充币",
          "提币"
        ],
        withdrawRecordList:[],
        rechargeRecordList:[]
      }
    },
    methods:{
      toggle(index){
        this.active=index
      },
      getWithdrawRecordList(){
        var data={
          page:1
        }
        api.assetschargemoney(data).then(res => {
          console.log(res)
          if(res.error_code == 1000){
            this.withdrawRecordList = res.assets_list
          }else{
            this.$message({
                message: res.error_desc,
                type: 'error'
            })
          }
        })
      },
      getRechargeRecordList(){
        var data={
          page:1
        }
        api.assetsWithdraw(data).then(res => {
          if(res.error_code == 1000){
            this.rechargeRecordList = res.assets_list
          }else{
            this.$message({
                message: res.error_desc,
                type: 'error'
            })
          }
        })
      }
    },
    mounted() {
      this.getRechargeRecordList()
      this.getWithdrawRecordList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
 li{list-style: none;}
  .sjx_main{width: 987px;height: 940px;background: #1a232c;}
  .sjx_section{width: 890px;margin: 0 auto;height:940px;}
  .section_title{line-height: 87px;border-bottom: 1px solid #232935;color: #525d6f;font-size: 12px;}
  .section_title span{color: #c8cdd3;}
  .sjx_btn{height:92px;border-bottom: 1px solid #232935;overflow: hidden;}
  .btn_section{width: 220px;height: 34px;margin: 28px auto;}
  .btn_section p{width:110px;height: 34px;line-height: 34px;float: left;text-align: center;color: #bcbfc8;cursor: pointer;background: #24263b;}
  /*切换按钮*/
  .active{background: #585efa!important;color: #f6fbff!important;}
  /* 充币内容 */
  .charge_title{width:915px;height: 53px;border-bottom: 1px solid #232935;}
  .charge_title li{line-height: 53px;float: left;}
  .charge_title li:first-child{width:222px;;text-indent: 30px;}
  .charge_title li:nth-child(2){width: 217px;text-align: center;}
  .charge_title li:nth-child(3){width: 275px;text-align: center;}
  .charge_title li:nth-child(4){width: 174px;text-align: center;}
  .charge li{color:#dee1e8;}
  /* 提币内容*/
  .charge_title2 li:first-child{width: 190px;}
  .charge_title2 li:nth-child(2){width: 118px;}
  .charge_title2 li:nth-child(3){width: 154px;}
  .charge_title2 li:nth-child(4){width: 130px;}
  .charge_title2 li:nth-child(5){width: 170px;text-align: center;}
  .charge_title2 li:nth-child(6){width: 133px;text-align: center;}

</style>

