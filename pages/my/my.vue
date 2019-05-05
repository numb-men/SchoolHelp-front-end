<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!hasLogins ? 'logo-hover' : ''">
			<view class="img" v-show="hasLogin">
				<image class="logo-img" :src="uerInfo.avatarUrl"></image>
			</view>
			<view class="logo-title">
				<view v-if="!hasLogin" class="uer-name">快点我登录！福大学子为您待命^-^!</view>
				<view v-else class="uer-name">Hi，{{uerInfo.userName}}</view>
				<text class="go-login navigat-arrow" v-if="!hasLogin">&#xe65e;</text>
			</view>
		</view>
		<view>
			<div class="basic-data">
				<div class="basic-data-item" @click="goFollow"><text>{{uerInfo.fallow}}</text><text>我的关注</text>
				</div>
				<div class="basic-data-item" @click="goCollect"><text>{{uerInfo.collect}}</text><text>我的收藏</text>
				</div>
				<div class="basic-data-item" @click="goPost"><text>{{uerInfo.post}}</text><text>我的帖子</text>
				</div>
				<div class="basic-data-item" @click="goComment"><text>{{uerInfo.comment}}</text><text>我的评论</text>
				</div>
				<div class="basic-data-item"><text>{{uerInfo.points}}</text><text>我的积分</text>
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
	export default {
		computed: mapState(['hasLogin', 'uerInfo', 'token']),
		data() {
			return {
				userInfo: {
					userName: '',
					fallow: '',
					collect: '',
					points: '',
					post: '',
					comment: '',
					avatarUrl: ''
				}
			}
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
				var tokenTemp = this.token;
				uni.request({
					url: 'http://134.175.16.143:8080/schoolhelp-1.0.1/user',
					method: 'GET',
					header: {
						'token': tokenTemp
					},
					success: (result) => {
						if (result.data.code === 0) {
							uni.request({
								url: 'http://134.175.16.143:8080/schoolhelp-1.0.1/download/head',
								method: 'GET',
								header: {
									'token': tokenTemp
								},
								success: (resultHeadImage) => {
									function User(name, token, fallow, collect, points, post, comment, url) {
										this.name = name;
										this.token = token;
										this.fallow = fallow;
										this.collect = collect;
										this.points = points;
										this.post = post;
										this.comment = comment;
										this.url = url;
									}
									if (resultHeadImage.data.code === 0) {
										var user = new User(result.data.data.name, tokenTemp, result.data.data.fallowNum, result.data.data.collectPostNum,
											result.data.data.points, result.data.data.postNum, result.data.data.commentNum, 'http://' +
											resultHeadImage.data.data);
										this.userInfo.userName = result.data.data.name;
										this.userInfo.fallow = result.data.data.fallowNum;
										this.userInfo.collect = result.data.data.collectPostNum;
										this.userInfo.points = result.data.data.points;
										this.userInfo.post = result.data.data.postNum;
										this.userInfo.comment = result.data.data.commentNum;
										this.userInfo.avatarUrl = 'http://' + resultHeadImage.data.data;
										this.login(user);
										uni.stopPullDownRefresh();
									}
								},
								fail: () => {
									uni.showModal({
										content: "获取用户头像失败！",
										showCancel: false
									})
								}
							});
						}
					},
					fail: () => {
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
