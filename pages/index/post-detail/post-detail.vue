<template>
	<view class="content">
		<view class="post-detail">
			<view class="show-user">
				<image class="user-head-img" :src="post.user.headImg" mode=""></image>
				<view class="show-user-right">
					<view class="show-user-right-top">
						<view class="user-info">
							<view class="user-name">{{post.user.name}}</view>
							<view class="has-certified" v-if="post.user.isCertified">已认证</view>
							<view class="not-certified" v-else>未认证</view>
						</view>
						<view class="post-points">${{post.points}}</view>
					</view>
					<view class="post-publish-time">{{post.publishTime}}</view>
				</view>
			</view>
			<view class="post-title">{{post.title}}</view>
			<view class="devide-line"></view>
			<view class="post-content">{{post.content}}</view>
			<view class="operation-box">
				<image class="operation-icon" src="../../../static/icons/collect.png" mode=""></image>
				<image class="operation-icon" src="../../../static/icons/comment2.png" mode=""></image>
				<image class="operation-icon" src="../../../static/icons/give-a-like.png" mode=""></image>
				<image class="operation-icon" src="../../../static/icons/report.png" mode=""></image>
			</view>
		</view>
		<view class="post-devide-line"></view>
		<block v-for="(comment, index) in post.comments" :key="comment.id">
			<view class="comment-item" :data-index="index" :id="'comment-'+comment.id">
				<view class="show-user">
					<image class="user-head-img" :src="comment.user.headImg" mode=""></image>
					<view class="show-user-right">
						<view class="show-user-right-top">
							<view class="user-info">
								<view class="user-name">{{comment.user.name}}</view>
								<view class="has-certified" v-if="comment.user.isCertified">已认证</view>
								<view class="not-certified" v-else>未认证</view>
							</view>
							<image class="help-ok" src="../../../static/icons/help-ok.png" v-if="comment.helpOk"></image>
							<image class="help-not-ok" src="../../../static/icons/help-not-ok.png" v-else></image>
						</view>
						<view class="post-publish-time">{{comment.publishTime}}</view>
					</view>
				</view>
				<view class="comment-content">{{comment.content}}</view>
				<view class="operation-box">
					<image class="operation-icon" src="../../../static/icons/comment2.png" mode=""></image>
					<image class="operation-icon" src="../../../static/icons/give-a-like.png" mode=""></image>
					<image class="operation-icon" src="../../../static/icons/report.png" mode=""></image>
				</view>
				<view class="devide-line"></view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				postDetail: {},
				post: {
					user: {
						id: 1,
						headImg: "/static/images/img_1.jpg",
						isCertified: true,
						name: "衡与墨"
					},
					title: "[求]想买一本二手的算法设计与分析",
					content: "作者: 邓向阳、万婷婷 \r\n出版社: 冶金工业出版社\r\n出版年: 2006-7\r\n页数: 261\r\n" +
						"定价: 30.00元\r\n装帧: 简裝本\r\nISBN: 9787502440138",
					publishTime: "昨天 12：03",
					points: 100,
					comments: [{
							user: {
								id: 2,
								headImg: "/static/images/img_2.jpg",
								isCertified: true,
								name: "fishkk"
							},
							publishTime: "昨天 13：05",
							content: "我这刚好有一本，全新。要吗？",
							helpOk: true
						},
						{
							user: {
								id: 3,
								headImg: "/static/images/img_3.jpg",
								isCertified: false,
								name: "星夜、痕"
							},
							publishTime: "昨天 14：05",
							content: "我这刚好有一本，七成新。要吗？",
							helpOk: false
						},
						{
							user: {
								id: 4,
								headImg: "/static/images/img_4.jpg",
								isCertified: false,
								name: "lc"
							},
							publishTime: "昨天 15：05",
							content: "我这刚好有一本，八成新。要吗？",
							helpOk: false
						},
					]
				}
			}
		},
		methods: {

		},
		onLoad: function(option) {
			this.postDetail = JSON.parse(option.query);
			for (let key in this.postDetail) {
				console.log(key, "---", this.postDetail[key]);
			}
		}
	}
</script>

<style lang="scss">
	@import "@/app.scss";

	.content {
		background: #fefefe;
		border-top: 1px solid #e9e9e9;
		margin: 0;
		padding: 0;
	}

	.post-detail {
		width: 750upx;
		padding: 0 15upx;
		box-sizing: border-box;
	}

	.show-user {
		@include row;
		width: 730upx;
		box-sizing: border-box;
	}

	.user-head-img {
		@include circle(100upx);
		margin: 10upx 0;
		margin-right: 25upx;
	}

	.show-user-right {
		@include column;
		padding: 15upx 0;
	}

	.show-user-right-top {
		@include row;
		width: 600upx;
	}

	.user-info {
		@include row($space: left);
		width: 450upx;
	}

	.user-name {
		@include font(32upx, 45upx, #343131, $bold: bold, $align: left);
		padding-right: 10upx;
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

	.post-points {
		@include font(32upx, 45upx, #ffcc00, $bold: bold, $align: left);
	}

	.post-publish-time {
		@include font(23upx, 45upx, #343131, $align: left);
	}

	.post-title {
		width: 720upx;
		padding: 10upx 0;
		@include font(38upx, 45upx, $bold: bold, $align: left);
	}

	.post-content {
		width: 700upx;
		padding: 10upx;
		@include font(28upx, 45upx, #343131, $align: left);
	}

	.operation-box {
		@include row($space: flex-end);
		width: 720upx;
	}

	.operation-icon {
		@include icon(45upx);
		margin: 7upx 15upx;
	}

	.post-devide-line {
		@extend .devide-line;
		background: #c9c9c9;
		margin: 20upx 0;
	}

	.comment-item {
		@include column;
		padding: 5upx 15upx;
		width: 730upx;
	}

	.help-ok {
		@include icon(45upx);
		margin: 0 15upx;
	}

	.help-not-ok {
		@extend .help-ok;
	}

	.comment-content {
		width: 720upx;
		@include font(30upx, 45upx, #343131, $align: left);
		padding: 15upx 5upx;
	}
</style>
