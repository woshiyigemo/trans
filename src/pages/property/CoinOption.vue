<template>
    <div>
        <div class="top-title">
            总资产合计：{{balance}}
        </div>
       <el-table class="exchange-table coinlist"
                    :data="coinList"
                    style="width: 100%">
                        <el-table-column
                            prop="type"
                            label="币种"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="balance"
                            label="可用"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="frozen"
                            label="冻结">
                        </el-table-column>
                        <el-table-column
                            prop="options"
                            label="操作">
                        </el-table-column>
                    </el-table>
    </div>
</template>

<script>
import { api } from '@/static/api'
export default {
  name: 'CoinOption',
  data () {
    return {
        balance:0.173617413,
        coinList:[
            {
               type:'USDT',
               balance:182.000000,
               frozen:182.00000,
               options:'冲币' 
            },
            {
               type:'BTC',
               balance:182.000000,
               frozen:182.00000,
               options:'冲币' 
            }
        ]
    }
  },
  components:{

  },
  created(){
        
    },
    mounted () {
        
    },
  methods:{
      isInDealProcess(){
        if(this.$route.params.dealId && this.$route.params.type){
            console.log('hahahaha',this.$route.params.dealId,this.$route.params.type)
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.top-title{
    font-size: 18px;
    line-height: 32px;
    height: 32px;
    color: #c2c3ca;
    margin-bottom: 15px;
}
.coinlist{
    text-align: center;
}
</style>
