<template>
	<view class="commodity">
		<view class="commodity_item" v-for="item in commodituList" :key="item.id">
			<image class="commodity_img" :src="item.imgUrl" mode=""></image>
			<view class="commodity_content">
				<text class="commodity_name">{{item.name}}</text>
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
			commodituList: {
				type: Array,
				default: () => {
					return []
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.commodity {
		display: flex;
		flex-wrap: wrap;

		.commodity_item {
			width: 375rpx;
			padding-bottom: 20rpx;

			.commodity_img {
				width: 100%;
				height: 375rpx;
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
