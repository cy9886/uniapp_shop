<template>
	<view class="content">
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx-style">

		</view>
		<!-- #endif -->
		<scroll-view scroll-x="true" class="scroll_content" :scroll-into-view="scrollIndedx">
			<view v-for="(item,index) in topBar" :key="item.name" :id="'top' + index" class="scroll_item"
				@tap="changeTap(index)">
				<text :class="index === topBarIndex ? 'f-active-color' : 'f-color'">{{item.name}}</text>
			</view>
		</scroll-view>
		<swiper @change="onChangeTop" :current="topBarIndex" :style="'height:' + contentHeight + 'px;'">
			<swiper-item v-for="item in topBar" :key="item.name">
				<view class="swiper-item">
					<SwiperVue></SwiperVue>
					<Recommend></Recommend>
					<Card :title="'猜你喜欢'"></Card>
					<CommodityList></CommodityList>
					<!-- <Banner></Banner>
					<Icons></Icons>
					<Card title="热销爆品"></Card>
					<Hot></Hot>
					<Card title="推荐店铺"></Card>
					<Shop></Shop>
					<Card title="为您推荐"></Card>
					<CommodityList></CommodityList> -->
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import SwiperVue from '@/components/index/index.vue'
	import Recommend from '@/components/index/Recommend.vue'
	import Card from '@/components/common/Card.vue'
	import CommodityList from '@/components/common/CommodityList.vue'
	import Banner from '@/components/index/Banner.vue'
	import Icons from '@/components/index/Icons.vue'
	import Hot from '@/components/index/Hot.vue'
	import Shop from '@/components/index/Shop.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				topBar: [{
						name: '推荐'
					},
					{
						name: '运动户外'
					},
					{
						name: '服饰内衣'
					},
					{
						name: '鞋靴箱包'
					},
					{
						name: '美妆个护'
					},
					{
						name: '家具数码'
					},
					{
						name: '视频母婴'
					},
				],
				topBarIndex: 0, // 选中索引
				scrollIndedx: 'top0',
				contentHeight: 0 // 内容快的可视高度
			}
		},
		components: {
			SwiperVue,
			Recommend,
			Card,
			CommodityList,
			Banner,
			Icons,
			Hot,
			Shop
		},
		onLoad() {
			uni.request({
				url:'https://192.168.0.103:3000/api/test',
				method:'GET',
				success: (res) => {
					console.log(res);
				}
			})

		},
		onReady() { // 页面加载完
			const view = uni.createSelectorQuery().select('.swiper-item')
			view.boundingClientRect(data => {
				this.contentHeight = data.height
			}).exec();
		},
		methods: {
			/*
				切换tab栏
			*/
			changeTap(index) {
				if (this.topBarIndex === index) return
				this.topBarIndex = index
				this.scrollIndedx = 'top' + index
			},
			/*
				切换滑块
			*/
			onChangeTop(e) {
				const {
					current
				} = e.detail
				this.changeTap(current)
			}
		}
	}
</script>

<style lang="scss">
	.wx-style {
		height: 150rpx;
	}

	.scroll_content {
		width: 100%;
		height: 80rpx;
		white-space: nowrap;

		.scroll_item {
			display: inline-block;
			padding: 10rpx 30rpx;
			font-size: 36rpx;
		}

		.f-active-color {
			padding: 10rpx 0;
			border-bottom: 6rpx solid #49bdfb;
		}
	}
</style>
