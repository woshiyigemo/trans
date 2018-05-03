<template>
	<div class="coinoption" style="width: 987px;height: 940px;">
		<div class="sjx_main">
			<div class="sjx_section">
				<!-- <div class="section_title">资产中心<i class="el-icon-arrow-right"></i><span>财务记录</span> -->
				<div class="section_title">
					<div class="top-title">
						总资产合计：{{balance}}
						&nbsp;&nbsp;BTC<span style="font-size:14px;color:#344252;"> ≈ 559655 CNY</span>
						<div class="quikc-nav">
							<router-link class="quikc-link" to='/property/orderlist' style="margin-right:26px;">财务记录</router-link>
							<router-link class="quikc-link" to='/property/Address'>提币地址管理</router-link>
						</div>
					</div>
				</div>
				
				<el-table class="exchange-table coinlist" :data="assetslist" style="width: 100%">
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
								<button @click='getRechargeAdd()'>{{xm_getdata}}</button>
								<p class="popover-hint">温馨提示</p>
								<ul>
									<li>请勿向上述地址重置任何非BTC资产，否则资产将不可找回。</li>
									<li>您充值至上述地址后，需要整个网络节点的确认，1次网络确认后到账，6次网络确认后可提币。</li>
									<li>最小充值金额：0.001BTF，小于最小金额的充值将不会上账。</li>
									<li>您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮箱通知您。</li>
									<li>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</li>
								</ul>
							</el-popover>
							<el-popover popper-class="xm-pop" ref="pop" offset=0 width="800" trigger="click" placement="bottom-end" content="提币" style="margin-top:-10px;">
								<p class="pop-titter">提币地址</p>
								 <input type="text" class="pop-titter-div" v-model="Mention" /><!--{{Mention}} -->
								<p style="margin-top: 15px;">数量</p>
								<p class="xm-can-ast">
									<span>可提:{{can}}</span>
									<span>限额:{{astrict}}</span>
								</p>
								<span class="combo">  
								<input class="combo combo-text" v-model="count" @keyup='sendReq'>  
								<span style="margin-right: 10px;">{{maney_type}}</span>
								</span>
								<div style="overflow:hidden;">
								<div id="xm_num">
								<p style="margin-left: 15px;font-size:12px;color: #9ea2f9;">手续费</p>
								<span class="combo">  
								<input class="combo combo-text1" v-model="fee"/> 
								<span>  
								<span style="margin-right: 10px;">{{maney_type}}</span>
								</span>
								</span>
								</div>
								<div id="xm_num">
									<p style="margin-left: 15px;font-size:12px;color: #9ea2f9;">到账数量</p>
									<span class="combo" >  
									<input class="combo combo-text2" v-model="readAmount" />
									<span>  
									<span style="margin-right: 10px;">{{maney_type}}</span>
									</span>
									</span>
								</div>
								</div>
								
								<p class="popover-hint">温馨提示</p>
								<ul>
									<li>最小提币数为：200 USDT。</li>
									<li>为保障资金安全，当您账户安全策略变更、密码修改、使用新地址提币，我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系</li>
									<li>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</li>
								</ul>
								<button style="cursor: pointer;position: absolute;top: 295px;left: 570px; height: 50px;width: 200px;background:#4cb2f9;border:1px solid #aeb2ff;border-radius: 2px;color: #fcfcf2;font-size:16px;" @click="takecoin">提币</button>
							</el-popover>
							<el-button v-popover:popover type="text" size="small" class='recharge' @click="rechargeCoin(scope.row)">充币</el-button>
							<el-button v-popover:pop type="text" size="small" class='tibi' ref='index++' @click='withdrawCoin(scope.row)'>提币</el-button>
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
				rechargeInfo:{
					showAddress:false,
					address:''
				},
				withdrawInfo:{

				},
				assetslist: [{
						type: 'USDT',
						balance: 182.000000,
						frozen: 182.00000,
					},
					{
						type: 'BTC',
						balance: 182.000000,
						frozen: 182.00000,
					}
				]
			}
		},
		computed:{
		},
		created() {
			this.getAssetsList()
		},
		mounted() {
			// this.$nextTick(() => {
			// 	this.chongBiList = document.getElementsByClassName('recharge');
			// 	this.tiBiList = document.getElementsByClassName('tibi');
			// 	this.chongBiList[this.chongBiList.length - 1].style.display = this.tiBiList[this.chongBiList.length - 1].style.display = 'none';
			// })
			
		},
		methods: {
			isInDealProcess() {
				if(this.$route.params.dealId && this.$route.params.type) {
					console.log('hahahaha', this.$route.params.dealId, this.$route.params.type)
				}
			},

			takecoin(){
					var data = {
					 coin_name_en:this.maney_type
					}
					api.ationbtn(data).then(res => {
			
				})
			},
			// 获取资产列表
			getAssetsList(){
				api.getAssetslist()
				.then(res => {
					if(res.error_code == 1000){
						this.assetslist = res.assets_list
					}else{
						this.$message({
							message:res.error_desc,
							type: 'error'
						})
					}
				}).catch(err => {

				})
			},
			// 冲币
			rechargeCoin(row){
				console.log(row)
			},
			// 提币
			withdrawCoin(row){
				console.log(row)
			},
			// 获取冲币地址
			getRechargeAdd(){
				var data = {
					plate: "usdt"
				}
				api.getRechargeAddress(data).then(res => {
					if(res.error_code == 1000) {
						this.xm_getdata = "复制"
						this.rechargeInfo.address = res.user_address
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
    li{list-style: none;}
	.top-title {
		font-size: 18px;
		line-height: 32px;
		height: 32px;
		color: #c2c3ca;
		margin-bottom: 15px;
		position: relative;
		text-align: left;
	}
	
	// .coinlist {
	// 	text-align: center;
	// }
	
	
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
		outline: none;
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
		outline: none;
	}
	
	
	.sjx_main{width: 987px;background: #191f27;overflow:hidden;}
	.sjx_section{width: 890px;margin: 0 auto;}
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