<template>
	<view class="commodity_list">

		<Commodity :commodituList="commodituList"></Commodity>
	</view>
</template>

<script>
	import Commodity from './Commodity.vue'
	export default {
		components: {
			Commodity
		},
		data() {
			return {
				commodituList: [{
					id: '001',
					imgUrl: require('@/static/img/commodity1.jpg'),
					name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
					pprince: '299.00',
					oprince: '799.00',
					discount: 3
				},
				{
					id: '002',
					imgUrl: require('@/static/img/commodity1.jpg'),
					name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
					pprince: '299.00',
					oprince: '799.00',
					discount: 3
				},
				{
					id: '003',
					imgUrl: require('@/static/img/commodity1.jpg'),
					name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
					pprince: '299.00',
					oprince: '799.00',
					discount: 3
				},
				{
					id: '004',
					imgUrl: require('@/static/img/commodity1.jpg'),
					name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
					pprince: '299.00',
					oprince: '799.00',
					discount: 3
				}]
			}
		}
	}
</script>

<style>
</style>
