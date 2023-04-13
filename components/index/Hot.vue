<template>
	<view class="hot">
		<Commodity :commodityList="commodityList" itemW="250rpx" bigH="220rpx"></Commodity>
	</view>
</template>

<script>
	import Commodity from '../common/Commodity.vue'
	export default {
		data() {
			return {
				commodityList: [{
					id: '001',
					imgUrl: require('@/static/img/hot1.jpg'),
					name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
					pprince: '299.00',
					oprince: '799.00',
					discount: 3
				},
				{
					id: '002',
					imgUrl: require('@/static/img/hot2.jpg'),
					name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
					pprince: '299.00',
					oprince: '799.00',
					discount: 3
				},
				{
					id: '003',
					imgUrl: require('@/static/img/hot3.jpg'),
					name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
					pprince: '299.00',
					oprince: '799.00',
					discount: 3
				}]
			}
		},
		components:{
			Commodity
		}
	}
</script>

<style lang="scss" scoped>
</style>