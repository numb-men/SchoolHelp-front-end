<template>
	<view class="center">
		<view class="logo">
			<image class="logo-img" :src="appUrl"></image>
			<text class="title">校园帮</text>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-text">版本更新</text>
				<view>
					<button class="update">更新</button>
					<text class="list-text-version">v1.0.0</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appUrl: '/static/icons/logo.png'
			}
		},
		methods: {

		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	page {
		background-color: #f2f2f2;
	}

	.center {
		flex-direction: column;
		background-color: #f2f2f2;
	}

	.list-text {
		margin-left: 20upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.title {
		height: 90upx;
		line-height: 90upx;
		font-size: 40upx;
		color: #555;
		text-align: center;
	}

	.list-text-version {
		margin-left: 10upx;
		margin-right: 10upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.update {
		height: 70upx;
		/* line-height: 30upx; */
		vertical-align: middle;
		font-size: 28upx;
		color: #FFFFFF;
		text-align: center;
		background-color: #00BFFF;
		margin-top: 10upx;
		/* padding-top: -10upx; */
		box-sizing: border-box;
	}

	.img {
		width: 150upx;
		height: 150upx;
		/* justify-content: center; */
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 50%;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 30upx 0;
		flex-direction: column;
		/* box-sizing: border-box; */
		background-color: #AF94FF;
		/* text-align: center; */
		align-items: center;
		/* justify-content: center; */
	}

	.center-list {
		background-color: #FFFFFF;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		/* padding: 0upx 20upx; */
		/* vertical-align: middle; */
		/* justify-content: space-between; */
	}
</style>
