<template>
	<view class="card">
		<view>-</view>
		<slot>
			<view class="title">{{ title }}</view>
		</slot>
		<view>-</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String
			}
		}
	}
</script>

<style scoped lang="scss">
	.card {
		padding: 20rpx;
		display: flex;
		justify-content: center;
		font-weight: bold;

		.title {
			padding: 0 20rpx;
			font-size: 32rpx;
		}
	}
</style>
