<template>
	<view class="root">
		<view class="head-nav">
			<text class="head-text">我的</text>
			<image class="head-setting" src="../../static/icons/setting1.png" @click="goSetting"></image>
			<image class="head-notification" src="../../static/icons/notification.png" @click="goMessage"></image>
		</view>
		<view class="center">
			<view class="logo-backgroud">
				<view class="logo">
					<view class="img">
						<image v-if="!hasLogin" class="logo-img" @click="goLogin" hover-class="logo-hover" src="/static/icons/logo.png"></image>
						<image v-else class="logo-img" :src="userInfo.headUrl"></image>
					</view>
					<view class="logo-title">
						<view v-if="!hasLogin" @click="goLogin" class="user-name">登录</view>
						<view v-else class="user-name">{{userInfo.name}}</view>
						<!-- <text class="go-login navigat-arrow" v-if="!hasLogin">&#xe65e;</text> -->
					</view>
				</view>
				<view>
					<image @click="goEditInformation()" class="logo-edit" src="../../static/icons/edit_information.png"></image>
				</view>
				<view>
					<text class="point-text">$积分&#xe65e;</text>
				</view>
			</view>

			<view class="body">
				<div class="basic-data">
					<div class="basic-data-item" @click="goFollow"><text>关注</text><text>{{userInfo.followNum}}</text></div>
					<div class="basic-data-item" @click="goCollect"><text>收藏</text><text>{{userInfo.collectPostNum}}</text></div>
					<div class="basic-data-item" @click="goPost"><text>帖子</text><text>{{userInfo.postNum}}</text></div>
					<div class="basic-data-item-last" @click="goComment"><text>评论</text><text>{{userInfo.commentNum}}</text></div>
					<!-- <div class="basic-data-item"><text>{{userInfo.points}}</text><text>我的积分</text>
					</div> -->
				</div>
			</view>
			<!-- <view class="center-list">
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
			</view> -->
			<view class="image-con">
				<view class="left-up">
					<image class="left-up-img" src="../../static/images/my_2.jpg"></image>
				</view>
				<view class="right-up">
					<image class="right-up-img" src="../../static/images/my_3.jpg"></image>
				</view>
			</view>
			<view class="image-con">
				<view class="left-bottom">
					<image class="left-bottom-img" src="../../static/images/my_1.jpg"></image>
				</view>
				<view class="right-bottom">
					<image class="right-bottom-img" src="../../static/images/my_4.jpg"></image>
				</view>
			</view>
			<!-- <view id="container">
				<div id="box">
					<div class="front"><img src="../../static/images/my_2.jpg" /></div>
					<div class="back"><img src="../../static/images/add2.png" /></div>
					<div class="left"><img src="../../static/images/img_4.jpg" /></div>
					<div class="right"><img src="../../static/images/img_1.jpg" /></div>
					<div class="top"><img src="../../static/images/img_3.jpg" /></div>
					<div class="bottom"><img src="../../static/images/my_background.jpg" /></div>
				</div>
			</view> -->
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
				}
			},
			goSetting() {
				uni.navigateTo({
					url: 'setting/setting'
				})
			},
			goMessage() {
				if (this.hasLogin) {
					uni.navigateTo({
						url: '../../pages/messages/messages'
					})
				}
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
				if (this.hasLogin) {
					uni.navigateTo({
						url: 'my-fallows/my-fallows' //关注界面路径
					});
				}
			},
			goCollect() {
				if (this.hasLogin) {
					uni.navigateTo({
						url: 'my-collects/my-collects' //收藏界面路径
					});
				}
			},
			goPost() {
				if (this.hasLogin) {
					uni.navigateTo({
						url: 'my-post/my-post' //我的帖子界面路径
					});
				}
			},
			goComment() {
				if (this.hasLogin) {
					uni.navigateTo({
						url: 'my-comments/my-comments' //我的评论界面路径
					});
				}
			},
			goEditInformation() {
				if (this.hasLogin) {
					uni.navigateTo({
						url: '../../pages/my/setting/edit-information/edit-information' //我的评论界面路径
					});
				}
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

	.root {
		width: 750upx;
	}

	.center {
		position: relative;
		top: 140upx;
		flex-direction: column;
	}

	.head-nav {
		position: fixed;
		width: 750upx;
		background-color: #FFFFFF;
		height: 70upx;
		padding-top: 70upx;
		z-index: 9999;
	}

	.head-text {
		height: 60upx;
		font-size: 36upx;
		text-align: center;
		/* font-weight: bold; */
		flex: 1;
	}

	.head-setting {
		position: absolute;
		top: 65upx;
		left: 680upx;
		width: 60upx;
		height: 55upx;
		margin-left: 10upx;
	}

	.head-notification {
		position: absolute;
		top: 65upx;
		left: 610upx;
		width: 60upx;
		height: 55upx;
	}

	.basic-data {
		/* height: 120upx; */
		width: 100%;
		margin: 10px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #f8f8f8;
		justify-content: center;
	}

	.basic-data-item {
		width: 80px;
		font-size: 34upx;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f8f8f8;
		border-right: 1px solid #888888;
	}

	.basic-data-item-last {
		width: 80px;
		font-size: 34upx;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f8f8f8;
	}

	.logo-backgroud {
		width: 750upx;
		height: 280upx;
		background-image: url(../../static/images/my_background.jpg);
	}

	.logo {
		position: relative;
		left: 50upx;
		top: 160upx;
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

	.logo-hover {
		opacity: 0.8;
	}

	.img {
		position: relative;
		left: -210upx;
		top: -85upx;
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		box-shadow: 3px 3px 8px #888888;
		background-color: #FFFFFF;
		z-index: 100;
	}

	.logo-img {
		weight: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.logo-title {
		position: absolute;
		left: 40upx;
		top: 120upx;
		height: 40upx;
		text-align: left;
	}

	.user-name {
		text-align: left;
		height: 40upx;
		font-size: 38upx;
		color: #3C3E49;
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

	.body {
		position: relative;
		top: 80upx;
	}

	.logo-edit {
		position: relative;
		top: 285upx;
		left: -30upx;
		width: 70upx;
		height: 70upx;
	}

	.point-text {
		font-family: texticons;
		position: absolute;
		height: 50upx;
		top: 90upx;
		left: 580upx;
		font-size: 34upx;
		color: #555;
		text-align: center;
		border-width: 1upx;
		border-color: #FFFFFF;
		border-style: solid;
		box-shadow: 1px 1px 5px #888888;
		background-color: #FFFFFF;
		border-radius: 10upx;
	}

	.center-list {
		position: relative;
		top: 80upx;
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

	.image-con {
		position: relative;
		top: 80upx;
		width: 750upx;
	}

	.left-up {
		/* border-style: solid;
		border-radius: 20upx; */
		/* border-width: 1upx; */
		/* border-color: #f8f8f8; */
		width: 315upx;
		height: 400upx;
		padding-left: 40upx;
	}

	.left-bottom {
		width: 315upx;
		height: 250upx;
		padding-top: 20upx;
		padding-left: 40upx;
	}

	.right-up {
		width: 335upx;
		height: 250upx;
		padding-left: 20upx;
	}

	.right-bottom {
		position: relative;
		top: -130upx;
		left: 0upx;
		width: 335upx;
		height: 400upx;
		padding-left: 20upx;
	}
	
	.left-up-img {
		border-radius: 20upx;
		width: 100%;
		height: 100%;
	}
	
	.left-bottom-img {
		border-radius: 20upx;
		width: 100%;
		height: 100%;
	}
	
	.right-up-img {
		border-radius: 20upx;
		width: 100%;
		height: 100%;
	}
	
	.right-bottom-img {
		border-radius: 20upx;
		width: 100%;
		height: 100%;
	}

	#container {
		width: 100%;
		height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
		perspective: 500px;
	}

	#box {
		width: 200px;
		height: 200px;
		transform-style: preserve-3d;
		transform: translateZ(-100px);
		transition: transform 1s;
		animation: spin 30s linear infinite;
	}

	#box div {
		width: 200px;
		height: 200px;
		position: absolute;
	}

	img {
		width: 100%;
		height: 100%;
		opacity: 0.9;
	}

	/*立方体的六个面*/
	.front {
		background-color: rgba(0, 255, 255, 0.2);
		transform: translateZ(100px);
		/*往外移动100像素*/
	}

	.back {
		background-color: rgba(0, 255, 0, 0.3);
		transform: translateZ(-100px) rotateY(180deg);
		/*往里移动100像素，绕Y轴旋转180度*/
	}

	.left {
		background-color: rgba(0, 0, 255, 0.3);
		transform: translateX(-100px) rotateY(-90deg);
		/*往左移动100像素，绕Y轴旋转90度*/
	}

	.right {
		background-color: rgba(255, 255, 0, .3);
		transform: translateX(100px) rotateY(90deg);
		/*往右移动100像素，绕Y轴旋转90度*/
	}

	.top {
		background-color: rgba(255, 0, 255, .3);
		transform: translateY(-100px) rotateX(90deg);
		/*向上移动100像素，绕X轴旋转90度*/
	}

	.bottom {
		background-color: rgba(255, 0, 0, 0.3);
		transform: translateY(100px) rotateX(-90deg);
		/*向下移动100像素，绕X轴旋转90度*/
	}

	/*动画*/
	@keyframes spin {
		0% {
			transform: rotateX(0deg) rotateY(0deg);
		}

		20% {
			transform: rotateX(0deg) rotateY(360deg);
		}

		40% {
			transform: rotateX(360deg) rotateY(360deg);
		}

		60% {
			transform: translateZ(-100px) rotateX(-90deg) rotateY(90deg);
		}

		80% {
			transform: rotateX(180deg) rotateY(-180deg);
		}

		100% {
			transform: rotateX(0deg) rotateY(0deg);
		}
	}
</style>
