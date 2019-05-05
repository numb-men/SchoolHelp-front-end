<template>
	<view class="content">
		<block v-for="(myFollow, index) in myFollows" :key="myFollow.id">
			<view class="my-follow-item" :id="myFollow.id" :data-index="index">
				<view class="left">
					<image :src="myFollow.userHeadImg" class="user-head-img"></image>
					<view class="my-follow-item-center">
						<view class="has-certified" v-if="myFollow.isCertified">已认证</view>
						<view class="not-certified" v-else>未认证</view>
						<view class="user-name">{{myFollow.name}}</view>
					</view>
				</view>
				<view class="my-follow-item-right">
					<image class="normal-icon" src="/static/icons/more.png"></image>
					<image class="normal-icon" src="/static/icons/cancel-follow.png"></image>
				</view>
			</view>
			<view class="devide-line"></view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myFollows: [
					{
						id: 1,
						userHeadImg: "/static/images/img_1.jpg",
						isCertified: true,
						name: "衡与墨Mommmmmmmmm"
					},
					{
						id: 2,
						userHeadImg: "/static/images/img_2.jpg",
						isCertified: true,
						name: "fishkk"
					},
					{
						id: 3,
						userHeadImg: "/static/images/img_3.jpg",
						isCertified: false,
						name: "星夜、痕"
					},
					{
						id: 4,
						userHeadImg: "/static/images/img_4.jpg",
						isCertified: false,
						name: "lc"
					},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import "@/app.scss";
	.my-follow-item {
		@include row;
		padding: 20upx 30upx;
	}
	.left {
		@include row;
		max-width: 600upx;
	}
	.user-head-img {
		@include circle(100upx);
		margin-right: 25upx;
	}
	.my-follow-item-center {
		@include column;
	}
	.has-certified {
		background: rgb(0, 153, 255);
		@include font(25upx, 40upx, #fefefe, $bold: bold);
		border-radius: 5upx;
		margin-bottom: 6upx;
		width: 105upx;
	}
	.not-certified {
		@extend .has-certified;
		background: #ccc;
	}
	.user-name {
		@include font(32upx, 45upx, #343131, $bold:bold, $align: left);
	}
	.my-follow-item-right {
		@include column;
	}
</style>
