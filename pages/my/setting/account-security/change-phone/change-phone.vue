<template>
	<view class="center">
		<view class="list-up">
			<view class="center-list">
				<view class="center-list-item border-bottom">
					<text class="list-text">已绑定手机号</text>
					<text class="phone-text">{{userInfo.phone}}</text>
				</view>
			</view>
		</view>

<!-- <form @submit="bindLogin"></form> -->
		<view class="list-up">
			<view class="center-list">
				<view class="center-list-item">
					<input class="phone-input" type="number" v-model="phone" placeholder="输入新的手机号" maxlength="11" />
					<button class="certificate">获取验证码</button>
				</view>
				<view class="center-list-item">
					<input class="phone-input" type="number" placeholder="输入短信验证码" maxlength="4" />
				</view>
				<view class="center-list-item border-bottom">
					<button class="button-confirm" @click="send()">确认修改</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import store from "../../../../../store/index.js";
	import api from "../../../../../api/api.js";
	export default {
		computed: mapState(['hasLogin', 'userInfo', 'token']),
		data() {
			return {
				phone:''
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
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
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
	}

	.basic-data {
		width: 100%;
		margin: 5px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #f8f8f8;
		justify-content: space-between;
	}

	.basic-data-item {
		width: 60px;
		font-size: 80%;
		text-align: center;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: space-between;
		background-color: #ffffff;
		border: 1px solid #CCCCCC;
		border-radius: 10%;
	}

	.center {
		flex-direction: column;
		background-color: #f2f2f2;
	}


	.list-up {
		margin-top: 10upx;
		margin-bottom: 30upx;
	}

	.list-mid {
		margin-top: 10upx;
		margin-bottom: 30upx;
	}

	.list-bottom {
		margin-top: 10upx;
		margin-bottom: 30upx;
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

	.logo-hover {
		opacity: 0.8;
	}

	.img {
		width: 150upx;
		height: 150upx;
	}

	.logo-img {
		weight: 100%;
		height: 100%;
		border-radius: 75upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.center-list {
		background-color: #FFFFFF;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		margin-top: 10upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #2F85FC;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
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

	.picker-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #FFCC00;
		flex: 1;
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

	.button-confirm {
		margin-left: 5upx;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		font-size: 34upx;
		color: #FFFFFF;
		text-align: center;
		background-color: #0079FF;
	}


	.certificate {
		margin-left: 5upx;
		height: 80upx;
		line-height: 80upx;
		font-size: 34upx;
		color: #FFFFFF;
		text-align: center;
		background-color: #0079FF;
	}

	.switch {
		line-height: 90upx;
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>
