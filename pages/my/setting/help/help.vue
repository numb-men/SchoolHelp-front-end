<template>
	<view class="center">
		<view class="list-up">
			<text class="title-text">常见问题</text>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-text">如何更改学生认证？</text>
			</view>
			<view class="center-list-item border-bottom">
				<text class="list-text">积分如何使用？</text>
			</view>
			<view class="center-list-item border-bottom">
				<text class="list-text">校园帮是个怎样的产品？</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: mapState(['hasLogin', 'userInfo', 'token']),
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	.list-up {
		margin-top: 10upx;
		margin-bottom: 10upx;
		padding-left: 30upx;
	}

	.center {
		flex-direction: column;
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
		padding: 0upx 20upx;
	}

	.center-list-item:active {
		background-color: #eeeeee;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.title-text {
		height: 40upx;
		font-size: 28upx;
		color: #555;
		text-align: left;
	}
</style>
