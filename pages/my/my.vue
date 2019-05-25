<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!hasLogins ? 'logo-hover' : ''">
			<view class="img" v-show="hasLogin">
				<image class="logo-img" :src="userInfo.headUrl"></image>
			</view>
			<view class="logo-title">
				<view v-if="!hasLogin" class="uer-name">快点我登录！福大学子为您待命^-^!</view>
				<view v-else class="uer-name">Hi，{{userInfo.name}}</view>
				<text class="go-login navigat-arrow" v-if="!hasLogin">&#xe65e;</text>
			</view>
		</view>
		<view>
			<div class="basic-data">
				<div class="basic-data-item" @click="goFollow"><text>{{userInfo.followNum}}</text><text>我的关注</text>
				</div>
				<div class="basic-data-item" @click="goCollect"><text>{{userInfo.collectPostNum}}</text><text>我的收藏</text>
				</div>
				<div class="basic-data-item" @click="goPost"><text>{{userInfo.postNum}}</text><text>我的帖子</text>
				</div>
				<div class="basic-data-item" @click="goComment"><text>{{userInfo.commentNum}}</text><text>我的评论</text>
				</div>
				<div class="basic-data-item"><text>{{userInfo.points}}</text><text>我的积分</text>
				</div>
			</div>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="goSetting">
				<text class="list-icon">&#xe60f;</text>
				<text class="list-text">设置</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">修改资料</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<navigator url="feedback/feedback">
				<view class="center-list-item border-bottom">
					<text class="list-icon">&#xe639;</text>
					<text class="list-text">意见反馈</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import store from "../../store/index.js";
	import api from "../../api/api.js";
	export default {
		computed: mapState(['hasLogin', 'userInfo', 'token']),
		data() {
			return {}
		},
		onPullDownRefresh: function() {
			if (this.hasLogin) {
				this.reFresh();
			} else {
				uni.stopPullDownRefresh();
				return;
			}
		},
		methods: {
			bindLogin() {
				if (this.hasLogin) {
					this.logout()
				} else {
					uni.navigateTo({
						url: 'login/login'
					})
				}
			},
			goLogin() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: 'login/login'
					})
				};
			},
			goSetting() {
				uni.navigateTo({
					url: 'setting/setting'
				})
			},
			reFresh() {
				var url = api.urls.getSelfUserInfo;
				var data = {};
				api.req.get(url, data, (res) => {
					if (res.code === 0) {
						var urlHead = api.urls.getHead;
						var dataHead = {};
						let userInfoGet = res.data;
						api.req.get(urlHead, dataHead, (resHead) => {
							if (resHead.code === 0) {
								userInfoGet.headUrl = 'http://' + resHead.data;
								console.log(userInfoGet.headUrl);
								delete userInfoGet.password;
								store.commit("saveUserInfo", userInfoGet);
							} else {
								userInfoGet.headUrl = '/static/icons/logo.png';
							}
						});
						console.log(this.userInfo);
						uni.stopPullDownRefresh();
					} else {
						uni.showModal({
							content: "获取用户信息失败！",
							showCancel: false
						})
					}
				});
			},
			goFollow() {
				uni.navigateTo({
					url: 'my-fallows/my-fallows' //关注界面路径
				});
			},
			goCollect() {
				uni.navigateTo({
					url: 'my-collects/my-collects' //收藏界面路径
				});
			},
			goPost() {
				uni.navigateTo({
					url: 'my-post/my-post' //我的帖子界面路径
				});
			},
			goComment() {
				uni.navigateTo({
					url: 'my-comments/my-comments' //我的评论界面路径
				});
			},
			...mapMutations(['login'])
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
