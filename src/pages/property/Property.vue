<template>
    <div>
        <el-container class="property-container">
            <el-aside class="leftside" style="width:200px;">
                <div class="wrapper">
                    <div class="topline">
                        资产中心
                    </div>
                    <div class="link active">
                        冲币提币
                    </div>
                </div>
            </el-aside>
            <el-main class="rightside">
                <div class="wrapper">
                    <router-view/>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { api } from '@/static/api'
export default {
  name: 'Property',
  data () {
    return {

    }
  },
  components:{

  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.property-container{
    width: 1200px;
    margin: 0 auto;
    background-color: #151920;
    .leftside{
        background-color: #151920; 
        color:#526078;
        padding:12px 12px 12px 0;
        text-align: center;
        min-height: 300px;
        .wrapper{
            width:200px;  
            background-color: #191f27;
        }
        .topline{
            height: 80px;
            line-height: 80px;
            background-color: #191f27;
            border-bottom: 1px solid #202234;
        }
        .link{
            height: 60px;
            line-height: 60px;
            background-color: #191f27;
        }
        .link.active{
            height: 60px;
            border-right:2px solid #4c54f9;
            line-height: 60px;
            background-color: #000;
        }
    }
    .rightside{
        padding-left: 12px;
        padding-top: 12px;
        .wrapper{
           padding:20px;
           background-color: #191f27;
           
        }
    }
}

</style>
