<template>
	<form class="content" @submit="bindLogin">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">手机号：</text>
				<m-input class="m-input" type="number" maxlength="11" clearable focus v-model="account" placeholder="请输入11位手机号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密&nbsp;&nbsp;&nbsp;&nbsp;码：</text>
				<m-input type="password" displayable v-model="password" maxlength="16" placeholder="至少8~16位数字与字母组合"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" :loading="loading" class="primary" formType="submit">登录</button>
		</view>
		<view class="action-row">
			<navigator url="../register/register">注册账号</navigator>
			<text>|</text>
			<navigator url="../forget-password/forget-password">忘记密码</navigator>
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
	import {
		hex_md5
	} from "../../../api/md5.js";


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
						title: '手机号为11位数字'
					});
					return;
				}
				if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.account))) {
					this.loading = false;
					uni.showToast({
						icon: 'none',
						title: '请检查手机号是否正确'
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
				this.password = hex_md5(this.password);
				var url = api.urls.login;
				var data = {
					phone: this.account,
					password: this.password
				};
				api.req.get(url, data, (res) => {
					if (res.code === 0) {
						this.$store.commit("login", {
							token: res.data,
							phone: data.phone,
							password: data.password
						});
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
										console.log(resInfo);
										let userInfoAndHead = resInfo.data;
										userInfoAndHead.headUrl = 'http://' + resHead.data;
										delete userInfoAndHead.password;
										this.$store.commit("saveUserInfo", userInfoAndHead);
										uni.navigateBack();
									} else {
										let userInfoAndHead = resInfo.data;
										userInfoAndHead.headUrl = '/static/icons/logo.png';
										delete userInfoAndHead.password;
										this.$store.commit("saveUserInfo", userInfoAndHead);
										uni.navigateBack();
									}
								});
							} else {
								uni.showModal({
									content: "获取用户信息失败！",
									showCancel: false
								})
							}
						});
					} else {
						uni.showModal({
							content: res.msg,
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
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
	}

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
