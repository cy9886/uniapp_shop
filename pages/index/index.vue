<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx-style">
			
		</view>
		<!-- #endif -->
		<SwiperVue></SwiperVue>
		<Recommend></Recommend>
		<Card :title="'猜你喜欢'"></Card>
		<CommodityList></CommodityList>
	</view>
</template>

<script>
	import SwiperVue from '@/components/index/index.vue'
	import Recommend from '@/components/index/Recommend.vue'
	import Card from '@/components/index/common/Card.vue'
	import CommodityList from '@/components/index/common/CommodityList.vue'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components: {
			SwiperVue,
			Recommend,
			Card,
			CommodityList
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
.wx-style {
	height: 150rpx;
}
</style>
