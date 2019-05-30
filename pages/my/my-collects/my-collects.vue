<template>
	<view id="my-collects" class="content">
		<view v-for="(postItem, index) in posts" :key="postItem.id"
			:id="postItem.id" :data-index="index" @click="goDetail">
			<view class="post-item">
				<view class="post-item-top">
					<view class="post-title">{{postItem.title}}</view>
					<view class="post-publish-time">{{postItem.publishTime}}</view>
				</view>
				<view class="post-item-center">
					{{postItem.content}}
				</view>
				<view class="post-item-bottom">
					<view class="user-box">
						<image :src="postItem.userHeadImg" class="user-head-img"></image>
						<view class="user-name">{{postItem.userName}}</view>
					</view>
					<view class="post-points">
						${{postItem.points}}
					</view>
					<view class="normal-icon-box">
						<image src="/static/icons/watch.png" class="normal-icon-box-icon"></image>
						<view class="normal-icon-box-text">{{postItem.watchNum}}</view>
					</view>
					<view class="normal-icon-box">
						<image src="/static/icons/comment.png" class="normal-icon-box-icon"></image>
						<view class="normal-icon-box-text">{{postItem.commentNum}}</view>
					</view>
				</view>
			</view>
			<view class="devide-line"></view>
		</view>
	</view>
</template>

<script>
	import {
		friendlyDate,
		cutString
	} from "@/common/util.js";
	
	export default {
		data() {
			return {
				posts: []
			}
		},
		onLoad() {
			var url = this.$api.urls.getAllCollects;
			var data = {};
			this.$api.req.get(url, data, (res) =>{
				console.log(res);
				this.posts = res.data.map((item) =>{
					return {
						id: item.postId,
						userHeadImg: item.imageUrl,
						title: item.title,
						content: cutString(item.content, 20),
						userName: item.name,
						publishTime: "8:00",
						points: 10,
						watchNum: 43,
						commentNum: 2,
					}
				})
				this.getPosts();
			})
		},
		methods: {
			getPosts() {
				this.posts.map((item) =>{
					let postId = item.id;
					var url = this.$api.urls.getEasyPost + postId;
					var data = {};
					this.$api.req.get(url, data, (res) =>{
						console.log(res);
						item.publishTime = friendlyDate(new Date(res.data.issueTime.replace(/\-/g, '/').replace(/\T/g, ' ').substring(0, 19)).getTime());
						item.points = res.data.points;
						item.watchNum = res.data.viewNum;
						item.commentNum = res.data.commentNum;
					});
				});
			},
			goDetail(e) {
				var detail = {postId: this.posts[e.currentTarget.dataset.index].id};
				uni.navigateTo({
					url: '../../index/post-detail/post-detail?query=' + encodeURIComponent(JSON.stringify(detail))
				});
			},
		}
	}
</script>

<style lang="scss">
	@import "@/app.scss";
	#my-collects {
		width: 750upx;
	}
	.post-item {
		@include column;
		padding: 17upx 35upx;
	}
	.post-item-top {
		@include row;
	}
	.post-title {
		@include font(34upx, 50upx, #343131, $bold: bold, $align: left);
	}
	.post-publish-time {
		@include font(26upx, 30upx, #343131);
		padding: 5upx 0 15upx 0;
		margin-right: 30upx;
	}
	.post-item-center {
		@include font(32upx, 50upx, #666, $align: left);
		margin: 15upx 0;
	}
	.post-item-bottom {
		@include row;
	}
	.user-box {
		@include row($space: left);
		width: 300upx;
	}
	.user-head-img {
		@include circle(60upx);
		margin-right: 10upx;
	}
	.user-name {
		margin-top: 10upx;
		@include font(32upx, 50upx, #666);
	}
	.post-points {
		margin-top: 10upx;
		@include font(32upx, 50upx, #FFCC00);
	}
</style>
