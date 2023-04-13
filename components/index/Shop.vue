<template>
	<view class="shop">
		<view class="shop_item">
			<view class="shop_img">
				<image src="../../static/img/shop.jpg" class="shop_img" mode=""></image>
			</view>
			<scroll-view scroll-x="true" class="scroll_content">
				<view class="scroll_item">
					<Commodity :commodityList="shopList" wrap="no-wrap" bigH="200rpx" itemW="200rpx" nameSize="20rpx">
					</Commodity>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Commodity from '../common/Commodity.vue'
	export default {
		data() {
			return {
				shopList: [{
						id: '001',
						imgUrl: require('@/static/img/shop1.jpg'),
						name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
						pprince: '299.00',
						oprince: '799.00',
						discount: 3
					},
					{
						id: '002',
						imgUrl: require('@/static/img/shop2.jpg'),
						name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
						pprince: '299.00',
						oprince: '799.00',
						discount: 3
					},
					{
						id: '003',
						imgUrl: require('@/static/img/shop3.jpg'),
						name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
						pprince: '299.00',
						oprince: '799.00',
						discount: 3
					},
					{
						id: '004',
						imgUrl: require('@/static/img/shop4.jpg'),
						name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
						pprince: '299.00',
						oprince: '799.00',
						discount: 3
					},
					{
						id: '005',
						imgUrl: require('@/static/img/shop3.jpg'),
						name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
						pprince: '299.00',
						oprince: '799.00',
						discount: 3
					},
					{
						id: '006',
						imgUrl: require('@/static/img/shop4.jpg'),
						name: '安徽的卡号是多久啊合理的哈考虑结婚时代看不上的空间白色的妇科疾病上课的吧',
						pprince: '299.00',
						oprince: '799.00',
						discount: 3
					}
				]
			}
		},
		components: {
			Commodity
		}
	}
</script>

<style lang="scss" scoped>
	.shop_item {
		.shop_img {
			width: 100%;
			height: 350rpx;
		}

		.scroll_content {
			width: 100%;
			white-space: nowrap;

			.scroll_item {
				display: inline-block;
			}
		}
	}
</style>
