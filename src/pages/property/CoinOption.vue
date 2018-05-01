<template>
	<div class="coinoption" style="width: 1200px;height: 940px;">
		<div class="sjx_main">
			<div class="sjx_section">
				<!-- <div class="section_title">资产中心<i class="el-icon-arrow-right"></i><span>财务记录</span> -->
				<div class="section_title">
					<div class="top-title">
						总资产合计：{{balance}}
						<div class="quikc-nav">
							<router-link class="quikc-link" to='/property/orderlist'>财务记录</router-link>
							<router-link class="quikc-link" to='/property/Address'>提币地址管理</router-link>
						</div>
					</div>
				</div>
				
				<el-table class="exchange-table coinlist" :data="coinList" style="width: 100%">
					<el-table-column prop="type" label="币种">
					</el-table-column>
					<el-table-column prop="balance" label="可用">
					</el-table-column>
					<el-table-column prop="frozen" label="冻结">
					</el-table-column>
					<el-table-column prop="options" label="操作" style='position: relative;'>
						<template slot-scope="scope">
							<el-popover popper-class="xm-popover" 
							offset=0
							placement="bottom-end"
							ref="popover" width="800" trigger="click">
								<p class="popover-titter">充币地址</p>
								<span>{{xm_dress}}</span>
								<button @click='getData()'>{{xm_getdata}}</button>
								<p class="popover-hint">温馨提示</p>
								<ul>
									<li>请勿向上述地址重置任何非BTC资产，否则资产将不可找回。</li>
									<li>您充值至上述地址后，需要整个网络节点的确认，1次网络确认后到账，6次网络确认后可提币。</li>
									<li>最小充值金额：0.001BTF，小于最小金额的充值将不会上账。</li>
									<li>您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮箱通知您。</li>
									<li>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</li>
								</ul>
							</el-popover>
							<el-popover popper-class="xm-pop" ref="pop" offset=0 width="800" trigger="click" placement="bottom-end" content="提币">
								<p class="pop-titter">提币地址</p>
								<div class="pop-titter-div">{{Mention}}</div>
								<p style="margin-top: 15px;">数量</p>
								<p class="xm-can-ast">
									<span>可提:{{can}}</span>
									<span>限额:{{astrict}}</span>
								</p>
								<span class="combo">  
								<input class="combo combo-text" v-model="count" @keyup='sendReq'>  
								<span style="margin-right: 10px;">{{maney_type}}</span>
								</span>
								<p>手续费</p>
								<span class="combo">  
								<span class="combo combo-text1">{{fee}}</span>  
								<span>  
								<span style="margin-right: 10px;">{{maney_type}}</span>
								</span>
								</span>
								<div id="xm_num">
									<p style="margin-left: 15px;">到账数量</p>
									<span class="combo" >  
									<span class="combo combo-text2" >{{readAmount}}</span>
									<span>  
									<span style="margin-right: 10px;">{{maney_type}}</span>
									</span>
									</span>
								</div>
								
								<p class="popover-hint">温馨提示</p>
								<ul>
									<li>最小提币数为：200 USDT。</li>
									<li>为保障资金安全，当您账户安全策略变更、密码修改、使用新地址提币，我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系</li>
									<li>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</li>
								</ul>
								<button style="position: absolute;top: 295px;left: 570px; height: 50px;width: 200px;background:#b669fd;border: 0;border-radius: 2px;color: #FFFFFF;" @click="takecoin">提币</button>
							</el-popover>
							<el-button v-popover:popover type="text" size="small" class='chongbi'>充币</el-button>
							<el-button v-popover:pop type="text" size="small" class='tibi' ref='index++' @click='scrolltop'>提币</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	import { api } from '@/static/api'
	export default {
		name: 'CoinOption',
		data() {
			return {
				index:0,
				balance: 0.173617413,
				can: 3.9542,
				count:0,
				rate:0,
				fee:0,
				readAmount:0,
				astrict: 100000.00000000,
				xm_getdata: "充币地址申请",
				xm_dress: "",
				Mention:"123DSA315sa3dAFSAASD",
				maney_type:"BTC",
				coinList: [{
						type: 'USDT',
						balance: 182.000000,
						frozen: 182.00000,
					},
					{
						type: 'BTC',
						balance: 182.000000,
						frozen: 182.00000,
					}, {}
				]
			}
		},
		computed:{
		},
		components: {

		},
		created() {
			var data={
				count:10,
				coin_name_en:"btc"
			}
			api.authentication(data).then(res=>{

			})
		},
		mounted() {
			this.$nextTick(() => {
				this.chongBiList = document.getElementsByClassName('chongbi');
				this.tiBiList = document.getElementsByClassName('tibi');
				this.chongBiList[this.chongBiList.length - 1].style.display = this.tiBiList[this.chongBiList.length - 1].style.display = 'none';
			})
		},
		methods: {
			isInDealProcess() {
				if(this.$route.params.dealId && this.$route.params.type) {
					console.log('hahahaha', this.$route.params.dealId, this.$route.params.type)
				}
			},
			scrolltop(e) {
				this.$nextTick(()=> {
					document.documentElement.scrollTop += 40;
					for(var i = 0; i < this.tiBiList.length; i++) {
						console.log(this.tiBiList[i].children[0],e.target)
						if(this.tiBiList[i].children[0] === e.target) {
							this.index = i;
							alert(1)
							this.maney_type=this.coinList[i].type
							console.log(this.coinList[i].type)
							break;
						}
					}
				});
				
				
				
				var data = {
					 coin_name: "BTC"
				}
				api.getAddress(data).then(res=>{
					console.log(res)
					if (res.error_code!=1000) {
						alert("失败")
					} else{
						this.Mention=res.data[0]
					}
				})


			},
			takecoin(){
					var data = {
					 coin_name_en:this.maney_type
					}
					api.ationbtn(data).then(res => {
			
				})
			},
			getData() {
				console.log(1);
				var data = {
					plate: "usdt"
				}
				api.dataId(data).then(res => {
					console.log(res)
					if(res.code) {
						this.xm_getdata = "复制"
						this.xm_dress = res.data[0]
					} else {

					}
					this.xm_getdata = res.data

				})

			},
			sendReq(){
				var data = {
					count:this.count,
					coin_name_en:this.coinList[this.index]
				};
				api.dataId(data).then(res => {
					if(res.error_code==1000) {
						this.fee = res.fee;
						this.readAmount = res.realAmount;

					}else {
						
					}
					
				})
			}

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
	.top-title {
		font-size: 18px;
		line-height: 32px;
		height: 32px;
		color: #c2c3ca;
		margin-bottom: 15px;
		position: relative;
	}
	
	.coinlist {
		text-align: center;
	}
	
	
	.combo {
		background-color: #5056E0;
		border: 0px solid;
		height: 35px;
		display: inline-block;
		white-space: nowrap;
		vertical-align: middle;
		margin: 15px 15px;
		line-height: 30px;
	}
	
	.combo .combo-text {
		font-size: 18px;
		color: #FFFFFF;
		border: 0px;
		line-height: 20px;
		height: 20px;
		margin: 0;
		padding: 0px 2px;
		vertical-align: baseline;
		border: 0px solid;
		height: 35px;
		width: 675px;
	}
	
	.combo .combo-text1 {
		font-size: 18px;
		color: #FFFFFF;
		border: 0px;
		margin: 0;
		padding: 0px 2px;
		vertical-align: baseline;
		border: 0px solid;
		width: 300px;
	}
	.combo .combo-text2 {
		font-size: 18px;
		color: #FFFFFF;
		border: 0px;
		margin: 0;
		padding: 0px 2px;
		vertical-align: baseline;
		border: 0px solid;
		width: 300px;
	}
	
	.xm-pop>.xm-can-ast {
		position: absolute;
		top: 98px;
		right: 38px;
	}
	#xm_num{
		position: absolute;
		top: 182px;
		left: 393px;
	}
	table tbody tr td button{
		padding:0 !important;
			}
	table tbody tr td button span {
		display: block;
		width: 100%;
		height:100%;
	}

	.sjx_main{width: 987px;background: #1a232c;overflow:hidden;}
	.sjx_section{width: 890px;margin: 0 auto;height:940px;}
	.section_title{border-bottom: 1px solid #232935;color: #525d6f;font-size: 12px;padding-top:20px;}
	.section_title span{color: #c8cdd3;}
	.quikc-nav{
		font-size: 16px;
		color: #718198;
		float: right;
		.quikc-link,
		.quikc-link:hover,
		.quikc-link:visited{
			color: #718198;
		}
	}
	

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