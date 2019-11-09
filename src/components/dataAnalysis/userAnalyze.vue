// 用户分析
<template>
	<div class="user-analysis">
		<!-- <timeSelect @rangeChange="rangeChange" :isNeedTimeSelect="isNeedTimeSelect">
			<h4 slot="title">渠道分析</h4>
		</timeSelect> -->
		<div class="dataShowBox">
			<div class="areaDataShow">
				<div id="showDataMap"></div>
				<div class="areaDataList hidden-xs-only">
					<div class="titleType">
						<span>城市</span>
						<span>用户数量</span>
						<span>用户占比</span>
					</div>
					<vueScroll style="flex:1">
						<div class="itemShowAreaData" v-for="(item, index) in areaData" :key="index">
							<span>{{index+1}}  {{item.name}}</span>
							<span>{{item.value}}</span>
							<span>{{item.value | scaleFilter}}</span>
						</div>
					</vueScroll>
				</div>
			</div>
			<div class="dataIntro hidden-xs-only">
				<span>指标说明</span>
				<div class="showIntroData">
					<div class="showItemCount">
						<span>&#12288;</span>
						<span>1</span>
						<span>2</span>
					</div>
					<div :class="['showItemData', {firstItemData: index == 0}]" v-for="(item, index) in tableData" :key="index">
						<span>{{item.dataType}}</span>
						<span>{{item.oneData}}</span>
						<span>{{item.twoData}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				// isNeedTimeSelect: false,
				tableData: [
					{
						dataType: '地域分布',
						oneData: '上海',
						twoData: '北京',
					},
					{
						dataType: '启动用户数',
						oneData: '14',
						twoData: '14',
					},
					{
						dataType: '启动次数分布',
						oneData: '上海',
						twoData: '北京',
					},
					{
						dataType: '新用户分布',
						oneData: '14',
						twoData: '14',
					},
					{
						dataType: '启动用户分布',
						oneData: '上海',
						twoData: '北京',
					},
				],
				myChart: '',
				defaultMap: 'china',
				areaData: [
							{name: '北京',value: 10},
					        {name: '天津',value: 20},
					        {name: '上海',value: 40},
					        {name: '重庆',value: 50},
					        {name: '河北',value: 200},
					        {name: '河南',value: 300},
					        {name: '云南',value: 800},
					        {name: '辽宁',value: 222},
					        {name: '黑龙江',value: 111},
					        {name: '湖南',value: 888},
					        {name: '安徽',value: 455},
					        {name: '山东',value: 114},
					        {name: '新疆',value: 14},
					        {name: '江苏',value: 75},
					        {name: '浙江',value: 454},
					        {name: '江西',value: 765},
					        {name: '湖北',value: 404},
					        {name: '广西',value: 325},
					        {name: '甘肃',value: 785},
					        {name: '山西',value: 324},
					        {name: '内蒙古',value: 257},
					        {name: '陕西',value: 782},
					        {name: '吉林',value: 982},
					        {name: '福建',value: 452},
					        {name: '贵州',value: 472},
					        {name: '广东',value: 142},
					        {name: '青海',value: 274},
					        {name: '西藏',value: 89},
					        {name: '四川',value: 423},
					        {name: '宁夏',value: 65},
					        {name: '海南',value: 21},
					        {name: '台湾',value: 374},
					        {name: '香港',value: 78},
					        {name: '澳门',value: 214}
					    ]
			}
		},
		// components: {timeSelect},
		filters: {
		  scaleFilter(val) { //总数 281
			return `${Math.round((val/10981)*10000)/100}%`
		  }
		},
		methods: {
			rangeChange() {

			},
			drawMap() {
				this.myChart = this.$echarts.init(document.getElementById('showDataMap'))
				this.axios({
				method: 'get',
				url: `/${this.defaultMap}.json`
				})
				.then((res) => {
					this.$echarts.registerMap(this.defaultMap, res.data)
					let $this = this
					this.myChart.setOption({
						tooltip: {},
						visualMap: {
							left: '2%',
							top: 'bottom',
							min: 10,
							max: 1000,
							inRange: {
								color: ['lightskyblue','yellow', 'orangered']
							},
							text:['高','低'],           // 文本，默认为数值文本
							calculable: true
						},
						series: [
							{
								name: '地域分布',
								type: 'map',
								geoIndex: 0,
								roam: false,
								map: this.defaultMap,
								itemStyle:{
									emphasis:{label:{show:true}}
								},
								data: $this.areaData
							}
						]
					});
					// window.onresize = function(){this.myChart.resize();}
				})
				.catch(err => {
					console.log(err)
				})
			},
			async dataMapLoad() {
				await this.drawMap()
				
				const $this = this
				this.myChart.on('click', function (params) {
					switch(params.name) {
						case '北京': 
							$this.defaultMap = 'province/beijing';
							break;
						case '天津':
							$this.defaultMap = 'province/tianjin';
							break;
						case '重庆':
							$this.defaultMap = 'province/chongqing';
							break;
						case '上海':
							$this.defaultMap = 'province/shanghai';
							break;
						case '河北':
							$this.defaultMap = 'province/hebei';
							break;
						case '河南':
							$this.defaultMap = 'province/henan';
							break;
					    case '云南':
					    	$this.defaultMap = 'province/yunnan';
					    	break;
					    case '辽宁':
					    	$this.defaultMap = 'province/liaoning';
					    	break;
					    case '黑龙江':
					    	$this.defaultMap = 'province/heilongjiang';
					    	break;
						case '湖南': 
							$this.defaultMap = 'province/hunan';
							if(params.name == '湖南') {
								$this.areaData = [
									{name: '长沙市',value: 800},
									{name: '株洲市',value: 600},
									{name: '湘潭市',value: 700},
									{name: '衡阳市',value: 50},
									{name: '岳阳市',value: 200},
									{name: '邵阳市',value: 300},
									{name: '湘西土家族苗族自治州',value: 800},
									{name: '娄底市',value: 562},
									{name: '怀化市',value: 222},
									{name: '郴州市',value: 111},
									{name: '常德市',value: 888},
									{name: '张家界市',value: 455},
									{name: '永州市',value: 114},
									{name: '益阳市',value: 14},
								]
							}
							break;
						case '安徽':
							$this.defaultMap = 'province/anhui';
							break;
					    case '山东':
					    	$this.defaultMap = 'province/shandong';
					    	break;
					    case '新疆':
					    	$this.defaultMap = 'province/xinjiang';
					    	break;
					    case '江苏':
					    	$this.defaultMap = 'province/jiangsu';
					    	break;
					    case '浙江':
					    	$this.defaultMap = 'province/zhejiang';
					    	break;
					    case '江西':
					    	$this.defaultMap = 'province/jiangxi';
					    	break;
					    case '湖北':
					    	$this.defaultMap = 'province/hubei';
					    	break;
					    case '广西':
					    	$this.defaultMap = 'province/guangxi';
					    	break;
					    case '甘肃':
					    	$this.defaultMap = 'province/gansu';
					    	break;
					    case '山西':
					    	$this.defaultMap = 'province/shanxi';
					    	break;
					    case '内蒙古':
					    	$this.defaultMap = 'province/neimenggu';
					    	break;
					    case '陕西':
					    	$this.defaultMap = 'province/shanxi1';
					    	break;
					    case '吉林':
					    	$this.defaultMap = 'province/jilin';
					    	break;
					    case '福建':
					    	$this.defaultMap = 'province/fujian';
					    	break;
					    case '贵州':
					    	$this.defaultMap = 'province/guizhou';
					    	break;
					    case '广东':
					    	$this.defaultMap = 'province/guangdong';
					    	break;
					    case '青海':
					    	$this.defaultMap = 'province/qinghai';
					    	break;
					    case '西藏':
					    	$this.defaultMap = 'province/xizang';
					    	break;
					    case '四川':
					    	$this.defaultMap = 'province/sichuan';
					    	break;
					    case '宁夏':
					    	$this.defaultMap = 'province/ningxia';
					    	break;
					    case '海南':
					    	$this.defaultMap = 'province/hainan';
					    	break;
					    case '台湾':
					    	$this.defaultMap = 'province/taiwan';
					    	break;
					    case '香港':
					    	$this.defaultMap = 'province/xianggang';
					    	break;
					    case '澳门':
					    	$this.defaultMap = 'province/aomen';
					    	break;
						default:
							$this.defaultMap = 'china'
							$this.areaData = [
							{name: '北京',value: 10},
					        {name: '天津',value: 20},
					        {name: '上海',value: 40},
					        {name: '重庆',value: 50},
					        {name: '河北',value: 200},
					        {name: '河南',value: 300},
					        {name: '云南',value: 800},
					        {name: '辽宁',value: 222},
					        {name: '黑龙江',value: 111},
					        {name: '湖南',value: 888},
					        {name: '安徽',value: 455},
					        {name: '山东',value: 114},
					        {name: '新疆',value: 14},
					        {name: '江苏',value: 75},
					        {name: '浙江',value: 454},
					        {name: '江西',value: 765},
					        {name: '湖北',value: 404},
					        {name: '广西',value: 325},
					        {name: '甘肃',value: 785},
					        {name: '山西',value: 324},
					        {name: '内蒙古',value: 257},
					        {name: '陕西',value: 782},
					        {name: '吉林',value: 982},
					        {name: '福建',value: 452},
					        {name: '贵州',value: 472},
					        {name: '广东',value: 142},
					        {name: '青海',value: 274},
					        {name: '西藏',value: 89},
					        {name: '四川',value: 423},
					        {name: '宁夏',value: 65},
					        {name: '海南',value: 21},
					        {name: '台湾',value: 374},
					        {name: '香港',value: 78},
					        {name: '澳门',value: 214}
					    ]
							break;
					}
					$this.drawMap()		
				})
			}
		},
		mounted() {
			setTimeout(() => {
				this.dataMapLoad()
			}, 10)
		}
	}
</script>

<style scoped>
	.user-analysis {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.dataShowBox {
		flex: 1;
		background-color: #fff;
	}
	.areaDataShow {
		width: 100%;
		height: 530px;
		display: flex;
		justify-content: space-between;
	}
	#showDataMap {
		height: 100%;
		flex: 1;
	}

	.dataIntro {
		padding: 30px 40px 0;
	}
	.dataIntro>span {
		display: block;
		font-size: 12px;
		color: #000000;
		display: block;
		margin-bottom: 20px;
	}
	.showIntroData {
		font-size: 12px;
		color: #000000;
		width: 100%;
		height:  auto;
		display: flex;
	}
	.showItemData {
		flex: 1;
		text-align: center;
	}
	.showItemCount, .showItemData {
		border-bottom: 1px solid #DDDEE1;
	}
	.showItemCount>span, .showItemData>span {
		display: block;
		padding: 10px 30px 10px 0;
		line-height: 16px;
	}
	.showItemCount>span:first-child, .showItemData>span:first-child {
		background: #FAFAFB;
	}
	.showItemCount {
		width: 80px;
	}
	.showItemCount>span {
		padding-left: 20px;
	}
	.showItemCount>span:nth-child(2), .showItemData>span:nth-child(2) {
		border-bottom: 1px solid #DDDEE1;
	}
	div.showItemData.firstItemData {
		min-width: 20%;
		text-align: left;
	}

	.areaDataList {
		height: 430px;
		width: 322px;
		margin: 50px 50px 0 0;
		display: flex;
		flex-direction: column;
		border: 1px solid #DDDEE1;
		border-top: none;
	}
	.titleType {
		height: 37px;
		background: #FAFAFB;
		font-size: 14px;
		color: #000000;
		display: flex;
	}
	.titleType>span {
		display: block;
		flex: 1;
		line-height: 37px;
		text-align: center;
	}
	.itemShowAreaData {
		display: flex;
		height: 36px;
		width: 100%;
		border-bottom: 1px solid #DDDEE1;
	}
	.itemShowAreaData>span {
		flex: 1;
		font-size: 12px;
		color: #000000;
		line-height: 36px;
		text-align: center;
	}
</style>