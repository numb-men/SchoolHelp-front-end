<template>
	<form class="content" @submit="register">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">手机号：</text>
				<m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">确认密码：</text>
				<m-input type="password" displayable v-model="checkPassword" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" formType="submit">注册</button>
		</view>
	</form>
</template>

<script>
	import mInput from '../../../components/m-input.vue';

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
				const regData = {
					account: this.account,
					password: this.password
				}

				uni.request({
					url: 'http://134.175.16.143:8080/schoolhelp/register', //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {
						phone: regData.account,
						password: regData.password
					},
					success: (res) => {
						if (res.data.code === 0) {
							uni.showToast({
								icon: 'none',
								title: '注册成功',
							});
							uni.navigateBack();
						} else {
							uni.showModal({
								content: "出现错误，请稍后再试！" + res.data.msg,
								showCancel: false
							});
						}
					},
					fail: (res) => {
						uni.showModal({
							content: "请求失败，请重试！",
							showCancel: false
						})
					}
				});
			}
		}
	}
</script>

<style>

</style>
