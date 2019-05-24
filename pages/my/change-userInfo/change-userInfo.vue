<template>
	<view id="change-userInfo">
		<!-- 背景图片 -->
		<image class="background-img" :src="userInfo.backgroundImg"></image>
		<!-- 用户资料 -->
		<view class="userInfo">
			<!-- 用户头像 -->
			<image class="userInfo-head-img" :src="userInfo.headImg"></image>
			
			<!-- 顶部 -->
			<view class="userInfo-top">
				<view class="userInfo-top-label">全部信息</view>
				<image class="userInfo-top-icon" src=""></image>
			</view>
			
			<!-- 详细资料 -->
			<view class="devide-line"></view>
			<view class="userInfo-item">
				<view class="userInfo-item-label">姓名</view>
				<input type="text" v-model="userInfo.name" class="userInfo-item-edit-input"/>
			</view>
			<view class="devide-line"></view>
			<view class="userInfo-item">
				<view class="userInfo-item-label">邮箱</view>
				<input type="text" v-model="userInfo.mail" class="userInfo-item-edit-input"/>
			</view>
			<view class="devide-line"></view>
			<view class="userInfo-item">
				<view class="userInfo-item-label">手机号</view>
				<input type="text" v-model="userInfo.phoneNum" class="userInfo-item-edit-input"/>
			</view>
			<view class="devide-line"></view>
			<view class="userInfo-item">
				<view class="userInfo-item-label">密码</view>
				<input type="text" v-model="userInfo.password" class="userInfo-item-edit-input"/>
			</view>
			<view class="devide-line"></view>
			<view class="userInfo-item">
				<view class="userInfo-item-label">更改学号绑定</view>
				<input type="text" v-model="userInfo.studentNum" class="userInfo-item-edit-input"/>
			</view>
			<view class="devide-line"></view>
		</view>
	</view>
</template>

<script>
	import store from "@/store/index.js";
	export default {
		data() {
			return {
				userInfo: {
					backgroundImg: "/static/images/img_3.jpg",
					headImg: "/static/images/img_4.jpg",
					name: "SchoolHelper",
					mail: "221600001@fzu.edu.cn",
					phoneNum: "18912345678",
					password: "********",
					studentNum: "221600001"
				}
			};
		},
		onLoad() {
		}
	}
</script>

<style lang="scss">
	@import "./change-userInfo";
</style>
