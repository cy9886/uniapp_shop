<template>
	<view class="icons">
		<view class="icons_item">
			<image class="icons_img" src="../../static/img/icons1.png" mode=""></image>
			<text class="f-color">运动户外</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.icons {
		display: flex;
		flex-wrap: wrap;
		.icons_item {
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-top: 20rpx;
			.icons_img {
				width: 110rpx;
				height: 110rpx;
			}
		}
	}
</style>