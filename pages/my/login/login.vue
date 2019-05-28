<template>
	<form class="content" @submit="bindLogin">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">手机号：</text>
				<m-input class="m-input" type="number" maxlength="11" clearable focus v-model="account" placeholder="请输入11位手机号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密&nbsp;&nbsp;&nbsp;&nbsp;码：</text>
				<m-input type="password" displayable v-model="password" maxlength="16" placeholder="至少8位数字与字母组合"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" :loading="loading" class="primary" formType="submit">登录</button>
		</view>
		<view class="action-row">
			<navigator url="../register/register">注册账号</navigator>
			<text>|</text>
			<navigator url="../change-password/change-password">忘记密码</navigator>
		</view>
		<!-- 第三方授权登录 -->
		<!-- <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
			</view>
		</view> -->
	</form>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import mInput from '../../../components/m-input.vue';
	import store from "../../../store/index.js";
	import api from "../../../api/api.js";

	export default {
		components: {
			mInput
		},
		computed: mapState(['hasLogin', 'userInfo', 'token']),
		data() {
			return {
				loading: false,
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				msg: ''
			}
		},
		// computed: mapState(['forcedLogin']),
		methods: {
			/**
			 * 第三方授权初始化
			 */
			// initProvider() {
			// 	const filters = ['weixin', 'qq', 'sinaweibo'];
			// 	uni.getProvider({
			// 		service: 'oauth',
			// 		success: (res) => {
			// 			if (res.provider && res.provider.length) {
			// 				for (let i = 0; i < res.provider.length; i++) {
			// 					if (~filters.indexOf(res.provider[i])) {
			// 						this.providerList.push({
			// 							value: res.provider[i],
			// 							image: '../../../static/img/' + res.provider[i] + '.png'
			// 						});
			// 					}
			// 				}
			// 				this.hasProvider = true;
			// 			}
			// 		},
			// 		fail: (err) => {
			// 			console.error('获取服务供应商失败：' + JSON.stringify(err));
			// 		}
			// 	});
			// },
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				var regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
				var regString = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/; //验证数字、字母至少出现一次，且只能为数字和字母的组合。
				// var pages = getCurrentPages();
				// var currPage = pages[pages.length - 1]; //当前页面
				// var prevPage = pages[pages.length - 2]; //上一个页面
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 */
				if (this.account.length != 11) {
					this.loading = false;
					uni.showToast({
						icon: 'none',
						title: '请检查手机号是否正确'
					});
					return;
				}
				if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.account))) {
					this.loading = false;
					uni.showToast({
						icon: 'none',
						title: '手机号只能为11位数字'
					});
					return;
				}
				if (this.password.length < 8) {
					this.loading = false;
					uni.showToast({
						icon: 'none',
						title: '密码最短为 8 个字符'
					});
					return;
				}
				if (!(regString.test(this.password))) {
					this.loading = false;
					uni.showToast({
						icon: 'none',
						title: '密码必须为字母和数字的组合'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const loginData = {
					phone: this.account,
					password: this.password
				};
				var url = api.urls.login;
				var data = {
					phone: loginData.phone,
					password: loginData.password
				};
				api.req.get(url, data, (res) => {
					if (res.code === 0) {
						store.commit("login", res.data);
						uni.showToast({
							icon: 'none',
							title: '登陆成功',
						});
						var urlInfo = api.urls.getSelfUserInfo;
						var dataInfo = {};
						api.req.get(urlInfo, dataInfo, (resInfo) => {
							if (resInfo.code === 0) {
								var urlHead = api.urls.getHead;
								var dataHead = {};
								api.req.get(urlHead, dataHead, (resHead) => {
									if (resHead.code === 0) {
										let userInfoAndHead = resInfo.data;
										userInfoAndHead.headUrl = 'http://' + resHead.data;
										delete userInfoAndHead.password;
										store.commit("saveUserInfo", userInfoAndHead);
									} else {
										let userInfoAndHead = resInfo.data;
										userInfoAndHead.headUrl = '/static/icons/logo.png';
										delete userInfoAndHead.password;
										store.commit("saveUserInfo", userInfoAndHead);
									}
								});
							} else {
								uni.showModal({
									content: "获取用户信息失败！",
									showCancel: false
								})
							}
						});
						uni.navigateBack();
					} else if (res.code === -200) {
						uni.showModal({
							content: "无效手机号！",
							showCancel: false
						});
						return;
					} else if(res.code===-6){
						uni.showModal({
							content: "密码错误！",
							showCancel: false
						});
						return;
					} else if(res.code===-2){
						uni.showModal({
							content: "用户不存在！",
							showCancel: false
						});
						return;
					} else if(res.code===-100){
						uni.showModal({
							content: "手机号和密码不能为空！",
							showCancel: false
						});
						return;
					} else {
						uni.showModal({
							content: "未知错误！",
							showCancel: false
						});
						return;
					}
				});
			},
			// oauth(value) {
			// 	uni.login({
			// 		provider: value,
			// 		success: (res) => {
			// 			uni.getUserInfo({
			// 				provider: value,
			// 				success: (infoRes) => {
			// 					/**
			// 					 * 获取用户信息后，需要将信息上报至服务端。
			// 					 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
			// 					 */
			// 					this.toMain(infoRes.userInfo.nickName);
			// 				}
			// 			});
			// 		},
			// 		fail: (err) => {
			// 			console.error('授权登录失败：' + JSON.stringify(err));
			// 		}
			// 	});
			// }, 
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../my',
					});
				} else {
					uni.navigateBack();
				}

			},
			...mapMutations(['login'])
		},
		onReady() {
			this.initPosition();
			// this.initProvider();
		}
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}
</style>
