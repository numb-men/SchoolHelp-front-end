<template>
	<form class="content" @submit="register">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">手&nbsp;&nbsp;机&nbsp;&nbsp;号：</text>
				<m-input type="number" focus clearable v-model="account" maxlength="11" placeholder="请输入11位手机号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</text>
				<m-input type="password" displayable v-model="password" maxlength="16" placeholder="至少8~16位数字与字母组合"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">确认密码：</text>
				<m-input type="password" displayable v-model="checkPassword" maxlength="16" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" formType="submit">注册</button>
		</view>
	</form>
</template>

<script>
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
		data() {
			return {
				account: '',
				password: ''
			}
		},
		methods: {
			register() {
				var regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
				var regString = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/; //验证数字、字母至少出现一次，且只能为数字和字母的组合。
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 */
				if (this.account.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '请检查手机号是否正确'
					});
					return;
				}
				if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.account))) {
					uni.showToast({
						icon: 'none',
						title: '手机号只能为11位数字'
					});
					return;
				}
				if (this.password.length < 8) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 8 个字符'
					});
					return;
				}
				if (!(regString.test(this.password))) {
					uni.showToast({
						icon: 'none',
						title: '密码必须为字母和数字的组合'
					});
					return;
				}
				if (!(this.password == this.checkPassword)) {
					uni.showToast({
						icon: 'none',
						title: '两次密码不一致'
					});
					return;
				}
				var that = this
				var url = api.urls.register;
				var data = {
					phone: that.account,
					password: hex_md5(that.password)
				};
				api.req.post(url, data, (res) => {
					if (res.code === 0) {
						uni.showToast({
							icon: 'none',
							title: '注册成功',
						});
						const loginData = {
							phone: that.account,
							password: that.password
						};
						var urlLogin = api.urls.login;
						var dataLogin = {
							phone: loginData.phone,
							password: hex_md5(loginData.password)
						};
						api.req.get(urlLogin, dataLogin, (resLogin) => {
							if (resLogin.code === 0) {
								store.commit("login", {
									token: resLogin.data,
									phone: dataLogin.phone,
									password: dataLogin.password
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
												let userInfoAndHead = resInfo.data;
												userInfoAndHead.headUrl = resHead.data;
												delete userInfoAndHead.password;
												store.commit("saveUserInfo",
													userInfoAndHead);
												uni.navigateBack();
											} else {
												let userInfoAndHead = resInfo.data;
												userInfoAndHead.headUrl =
													'/static/icons/logo.png';
												delete userInfoAndHead.password;
												store.commit("saveUserInfo",
													userInfoAndHead);
												uni.navigateBack();
											}
										});
									} else {
										uni.showModal({
											content: resInfo.msg,
											showCancel: false
										})
									}
								});
							} else {
								uni.showModal({
									content: resLogin.msg,
									showCancel: false
								});
								return;
							}
						});
						uni.reLaunch({
							url: '../../../pages/my/my'
						})
					} else {
						uni.showModal({
							content: res.msg,
							showCancel: false
						});
						return;
					}
				});
			}
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
</style>
