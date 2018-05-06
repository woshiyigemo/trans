<template>
    <div>
        <div class="banner">
            <div class="help_main">
                <p class="welcome">欢迎使用SHANGYA帮助</p>
                <div class="search">
                    <el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch" :trigger-on-focus="false" placeholder="输入您想搜索的内容~" @select="handleSelect" ></el-autocomplete>
                    <el-button>搜索</el-button>
                </div>
            </div>
        </div>
                    
        <!-- 常见问题 -->
        <div class="problem">
            <h5>常见问题</h5>
            <div class="message">
                <ul>
                    <li>SHANGYA怎么注册</li>
                    <li>证件认证</li>
                    <li>如何邮箱注册</li>
                    <li>如何实名认证</li>
                    <li>如何设置谷歌验证码</li>
                </ul>

                <ul>
                    <li>如何充币</li>
                    <li>为什么有些币种充币地址相同？</li>
                    <li>如何提币</li>
                    <li>提币限额&提币手续费</li>
                    <li>Ripple (XRP)充值添加标签的说明</li>
                </ul>

                <ul>
                    <li>新手必看</li>
                    <li>如何邮箱注册</li>
                    <li>如何手机注册</li>
                    <li>如何设置谷歌验证码</li>
                    <li>如何购买数字货币？</li>
                </ul>
            </div>  
        </div>
    </div>
</template>
<script>
export default {
   name:'Wiki',
   data() {
      return {
        restaurants: [],
        state1: ''
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "什么是数字资产交易所？" },
          { "value": "怎么充提币？" },
          { "value": "怎么交易数字货币？"},
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
}
</script>


<style>
*{margin: 0;padding: 0;}
ul li{list-style: none;}
.banner{width: 100%;height: 378px;background: url('~@/assets/img/help_01.png') no-repeat;}
.help_main{width: 1120px;margin: 0 auto;color: #eaf3ff;font-size: 28px;text-align: center;overflow: hidden;}
.welcome{margin: 126px 0 60px 0;}
.search{width: 635px;height: 55px;margin: 0 auto;}
.inline-input{height: 55px;float: left;}
.search input{width: 485px;height:55px;background: #eaf3ff;}
.search .el-button{width: 117px;height: 55px;border-radius: 0;background: #4c54f9;border: none;color:#fcfcf2;float: right;}
.el-autocomplete-suggestion li:hover{background: #151920;}
.el-autocomplete-suggestion__wrap{width: 485px;min-height: 166px;background: #171c23;color: #415065;padding: 0;border: none;overflow: hidden;margin: 0!important;border:1px solid #191f27;box-sizing: border-box;}
.el-popper{margin: 0!important;}
.popper__arrow{display: none!important;}
.el-scrollbar__view li:first-child{margin-top:40px;}

/* 常见问题 */
.problem{width: 1120px;min-height:400px;margin: 0 auto;overflow: hidden;}
.problem h5{font-size: 20px;color: #4d5f77;margin-top: 57px;background: url("~@/assets/img/problem.png") 7% no-repeat;text-indent: 110px;}
.message ul{float:left;font-size: 16px;color: #a2b2c8;line-height: 50px;margin-top: 40px;}
.message ul:first-child{width: 340px;margin-left: 108px;}
.message ul:nth-child(2){width: 439px;}
</style>



