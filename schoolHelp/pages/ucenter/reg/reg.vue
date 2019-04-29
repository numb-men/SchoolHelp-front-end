<template>
	<view class="content">
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
			<!-- <view class="input-row">
                <text class="title">邮箱：</text>
                <m-input type="text" clearable v-model="email" placeholder="请输入邮箱"></m-input>
            </view> -->
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	import service from '../../../service.js';
	import mInput from '../../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: '',
				password: '',
				email: ''
			}
		},
		methods: {
			register() {
				var regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
				var regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。
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
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.password.length < 6 || this.password.length > 16) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符，最长不超过16个字符'
					});
					return;
				}
				if (!(regNumber.test(this.password) && regString.test(this.password))) {
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
				const data = {
					account: this.account,
					password: this.password,
					email: this.email
				}
				service.addUser(data);
				uni.showToast({
					title: '注册成功'
				});
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
