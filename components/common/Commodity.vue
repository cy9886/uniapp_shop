<template>
	<view class="commodity" :style="'flex-wrap:'+ wrap + ';'">
		<view class="commodity_item" v-for="item in commodityList" :key="item.id" :style="'width:' + itemW + ';'">
			<image class="commodity_img" :src="item.imgUrl" mode="" :style="'height:' + bigH + ';' "></image>
			<view class="commodity_content">
				<text class="commodity_name" :style="'font-size:' + nameSize + ';'">{{item.name}}</text>
				<view class="prince">
					<text class="pprince">￥{{item.pprince}}</text>
					<text class="oprince">￥{{item.oprince}}</text>
				</view>
				<text class="discount">{{item.discount}}折</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			commodityList: {
				type: Array,
				default: () => {
					return []
				}
			},
			itemW: {
				type: String,
				default: '375rpx'
			},
			bigH: {
				type: String,
				default: '375rpx'
			},
			wrap: {
				type: String,
				default: 'wrap'
			},
			nameSize:{
				type:String,
				default:'26rpx'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.commodity {
		display: flex;

		.commodity_item {
			width: 375rpx;
			padding-bottom: 20rpx;

			.commodity_img {
				width: 100%;
			}

			.commodity_content {
				text-align: center;

				.commodity_name {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					color: #333;
					word-break: break-all;
					padding: 6rpx 20rpx;
				}

				.prince {
					display: flex;
					flex-direction: column;
					align-items: center;

					.oprince {
						text-decoration: line-through;
						font-size: 24rpx;
						color: #999;
					}
				}

				.discount {
					border-radius: 4rpx;
					border: 1rpx solid #ffcccc;
					padding: 2rpx 10rpx;
					font-size: 20rpx;
					color: #ffcccc;
				}
			}
		}
	}
</style>
