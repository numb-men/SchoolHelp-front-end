<template>
	<form class="content" @submit="register">
		<view class="input-group">
			<!-- <view class="input-row border">
				<text class="title">旧&nbsp;&nbsp;密&nbsp;&nbsp;码：</text>
				<m-input type="number" focus clearable v-model="account" maxlength="11" placeholder="请输入正在使用的密码"></m-input>
			</view> -->
			<view class="input-row border">
				<text class="title">旧&nbsp;&nbsp;密&nbsp;&nbsp;码：</text>
				<m-input type="password" displayable v-model="oldPassword" maxlength="16" placeholder="请输入正在使用的密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">新&nbsp;&nbsp;密&nbsp;&nbsp;码：</text>
				<m-input type="password" displayable v-model="password" maxlength="16" placeholder="至少8位数字与字母组合"></m-input>
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
	import mInput from '../../../../../components/m-input.vue';
	import store from "../../../../../store/index.js";
	import api from "../../../../../api/api.js";

	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: '',
				password: '',
				oldPassword: ''
			}
		},
		methods: {
			register() {
				var regString = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/; //验证数字、字母至少出现一次，且只能为数字和字母的组合。
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

				// var url = api.urls.register;
				// var data = {
				// 	phone: this.account,
				// 	password: this.password
				// };
				// api.req.post(url, data, (res) => {
				// 	if (res.code === 0) {
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: '注册成功',
				// 		});
				// 		uni.navigateBack();
				// 	} else if (res.code === -200) {
				// 		uni.showModal({
				// 			content: "无效手机号！请检查手机号是否正确。",
				// 			showCancel: false
				// 		});
				// 		return;
				// 	} else if (res.code === -4) {
				// 		uni.showModal({
				// 			content: "密码应由长度至少为8位的数字和字母组成！",
				// 			showCancel: false
				// 		});
				// 		return;
				// 	}
				// });
			}
		}
	}
</script>

<style>

</style>
