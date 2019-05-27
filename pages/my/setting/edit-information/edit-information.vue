<template>
	<view class="center">
		<view>
			<image class="head-image" src="../../../../static/images/my_background.jpg"></image>
		</view>
		<view class="img">
			<image class="logo-img" :src="userInfo.headUrl"></image>
		</view>
		<!-- <view class="logo-title">
				<view class="user-name">{{userInfo.name}}</view>
			</view> -->
		<view class="center-list-up">
			<view class="center-list-item">
				<text class="list-text">用户名</text>
				<text class="phone-text">{{userInfo.name}}</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item">
				<text class="list-text">手机号</text>
				<text class="phone-text">{{userInfo.phone}}</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item">
				<text class="list-text">学号</text>
				<text class="phone-text">12312321</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item">
				<text class="list-text">邮箱</text>
				<text class="phone-text">xxxxxx@163.com</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import store from "../../../../store/index.js";
	import api from "../../../../api/api.js";
	export default {
		computed: mapState(['hasLogin', 'userInfo', 'token']),
		data() {
			return {
				phone: ''
			}
		},
		methods: {
			...mapMutations(['logout']),
			logoOut() {
				if (this.hasLogin) {
					uni.showToast({
						icon: 'none',
						title: '注销成功',
					});
					this.logout();
					uni.navigateBack();
				} else {
					uni.showToast({
						icon: 'none',
						title: '您尚未登录哟~',
					});
				}
			},
			send() {
				if (this.phone.length != 11) {
					this.loading = false;
					uni.showToast({
						icon: 'none',
						title: '请检查手机号是否正确'
					});
					return;
				}
				if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))) {
					this.loading = false;
					uni.showToast({
						icon: 'none',
						title: '请检查手机号是否正确！'
					});
					return;
				}
			}
		}
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
		width: 750upx;
	}

	.center {
		flex-direction: column;
		background-color: #f2f2f2;
	}

	.head-image {
		width: 750upx;
		height: 350upx;
	}

	.logo {
		position: relative;
		left: 0upx;
		top: 0upx;
		background-color: #FFFFFF;
		width: 650upx;
		height: 200upx;
		flex-direction: column;
		align-items: center;
		border-width: 1upx;
		border-color: #FFFFFF;
		border-style: solid;
		box-shadow: 3px 3px 8px #888888;
		border-radius: 15upx;
	}

	.img {
		position: relative;
		left: 30upx;
		top: -100upx;
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		z-index: 99999;
		/* box-shadow: 3px 3px 8px #888888; */
	}

	.logo-img {
		weight: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #9E9E9E;
		flex-direction: row;
		align-items: center;
	}

	.center-list {
		position: relative;
		top: -160upx;
		width: 750upx;
		height: 80upx;
		background-color: #FFFFFF;
		flex-direction: column;
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.center-list-up {
		position: relative;
		top: -160upx;
		width: 750upx;
		height: 80upx;
		background-color: #FFFFFF;
		padding-top: 50upx;
		flex-direction: column;
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		margin-bottom: 20upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.phone-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: left;
	}

	.phone-input {
		height: 80upx;
		line-height: 80upx;
		font-size: 34upx;
		color: #555;
		text-align: center;
		border-width: 1upx;
		border-color: #AF94FF;
		border-style: solid;
		flex: 1;
	}
</style>
