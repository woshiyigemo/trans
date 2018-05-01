<template>
    <!-- 订单 -->
    <div>
        <el-container class="order-container">
            <el-tabs class="order-tab" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="当前委托" name="current">
                    <el-table
                    :data="curDelegate"
                    style="width: 100%">
                    <el-table-column
                        prop="time"
                        label="时间">
                    </el-table-column>
                    <el-table-column
                        prop="duad"
                        label="交易对">
                    </el-table-column>
                    <el-table-column
                        prop="direction"
                        label="方向">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="价格">
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        label="数量">
                    </el-table-column>
                    <el-table-column
                        prop="total"
                        label="委托总数">
                    </el-table-column>
                    <el-table-column
                        prop="deal"
                        label="成交额">
                    </el-table-column>
                    <el-table-column
                        prop="untreated"
                        label="未成交">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="cancelDetegate(scope.row)" type="text" size="small">撤销</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="委托历史" name="history">
                    <el-table
                    :data="hisDelegate"
                    style="width: 100%">
                    <el-table-column
                        prop="time"
                        label="时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="duad"
                        label="交易对"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="direction"
                        label="方向">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="价格">
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        label="数量">
                    </el-table-column>
                    <el-table-column
                        prop="total"
                        label="委托总数">
                    </el-table-column>
                    <el-table-column
                        prop="deal"
                        label="成交额">
                    </el-table-column>
                    <el-table-column
                        prop="untreated"
                        label="未成交">
                    </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="成交明细" name="detail">
                    <el-table
                    :data="detailDelegate"
                    style="width: 100%">
                    <el-table-column
                        prop="time"
                        label="时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="duad"
                        label="交易对"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="direction"
                        label="方向">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="价格">
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        label="数量">
                    </el-table-column>
                    <el-table-column
                        prop="total"
                        label="委托总数">
                    </el-table-column>
                    <el-table-column
                        prop="deal"
                        label="成交额">
                    </el-table-column>
                    <el-table-column
                        prop="untreated"
                        label="未成交">
                    </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-container>
    </div>
</template>

<script>
import { api } from '@/static/api'

export default {
  name: 'Order',
  data () {
    return {
        activeName:'current',
        curDelegate:[],
        hisDelegate:[],
        detailDelegate:[]
    }
  },
  components:{

  },
  created(){
      this.getCurDelegate()
      this.getHisDelegate()
      this.getDealDetail()
  },
  methods:{
      handleClick(a){
          console.log(a)
      },
      getCurDelegate(){
          var data = {}
          api.curDelegate()
          .then(res => {
              console.log(res)
              if(res.error_code == 1000){
                  this.curDelegate = res.entrusts
              }
          }).catch(err => {

          })
      },
      getHisDelegate(){
          var data = {}
          api.hisDelegate()
          .then(res => {
              console.log(res)
              if(res.error_code == 1000){
                  this.hisDelegate = res.entrusts
              }
          }).catch(err => {

          })
      },
      getDealDetail(){
          var data = {}
          api.dealDetail()
          .then(res => {
              console.log(res)
              if(res.error_code == 1000){
                  this.detailDelegate = res.entrusts
              }
          }).catch(err => {

          })
      },
      cancelDetegate(row){
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
      }
      
  }
}
</script>

<style lang='scss' scoped>
.order-container{
    width: 1200px;
    margin: 0 auto;
    background-color: #1a232c;
    margin-top: 30px;
    .order-tab{
        width: 100%;
    }
}
</style>

