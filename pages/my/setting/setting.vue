<template>
	<view class="center">
		<view class="list-up">
			<view class="center-list">
				<view class="center-list-item border-bottom" @click="gotoAccountSecurity()">
					<text class="list-text">账号与安全</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</view>
		</view>


		<view class="list-up">
			<view class="center-list">
				<navigator url="../../../pages/my/feedback/feedback">
					<view class="center-list-item border-bottom">
						<text class="list-text">意见反馈</text>
						<text class="navigat-arrow">&#xe65e;</text>
					</view>
				</navigator>
				<navigator url="../../../pages/my/setting/help/help">
					<view class="center-list-item border-bottom">
						<text class="list-text">帮助</text>
						<text class="navigat-arrow">&#xe65e;</text>
					</view>
				</navigator>
			</view>
		</view>

		<view class="list-up">
			<view class="center-list">
				<navigator url="../../../pages/my/setting/about-SchoolHelp/about-SchoolHelp">
					<view class="center-list-item border-bottom">
						<text class="list-text">关于校园帮</text>
						<text class="navigat-arrow">&#xe65e;</text>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import store from "../../../store/index.js";
	import api from "../../../api/api.js";
	export default {
		computed: mapState(['hasLogin', 'userInfo', 'token']),
		data() {
			return {}
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
			gotoAccountSecurity() {
				if (this.hasLogin) {
					uni.navigateTo({
						url: '../../../pages/my/setting/account-security/account-security'
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '您尚未登录哟~',
					});
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
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		/* background-color: #FFCC66; */
		background: -webkit-linear-gradient(right, #FFCC66, #FF0066);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #FFCC66, #FF0066);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #FFCC66, #FF0066);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(right, #FFCC66, #FF0066);
		/* 标准的语法（必须放在最后） */
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
