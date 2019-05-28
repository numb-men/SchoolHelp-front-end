<template>
	<view id="my-collects" class="content">
		<view v-for="(postItem, index) in posts" :key="postItem.id"
			:id="postItem.id" :data-index="index">
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
	export default {
		data() {
			return {
				posts: [
					{
						id: 1,
						userHeadImg: "/static/images/img_1.jpg",
						title: "出国留学小白求指教",
						publishTime: "8:00",
						content: "请问哪位大神知道出国留学有什么流程呢？",
						userName: "衡与墨",
						points: 10,
						watchNum: 43,
						commentNum: 2,
					},
					{
						id: 2,
						userHeadImg: "/static/images/img_2.jpg",
						title: "最近有嘉锡讲坛吗？",
						publishTime: "6:20",
						content: "...",
						userName: "kilig",
						points: 20,
						watchNum: 43,
						commentNum: 2,
					},
					{
						id: 3,
						userHeadImg: "/static/images/img_3.jpg",
						title: "求陈**老师的联系方式，急急急",
						publishTime: "8:00",
						content: "对他的细胞克隆猴项目感兴趣，希望加入其中",
						userName: "fishkk",
						points: 10,
						watchNum: 43,
						commentNum: 2,
					},
					{
						id: 4,
						userHeadImg: "/static/images/img_4.jpg",
						title: "北京",
						publishTime: "8:00",
						content: "...",
						userName: "lc",
						points: 10,
						watchNum: 43,
						commentNum: 2,
					},
				]
			}
		},
		onLoad() {
			var url = this.$api.urls.getAllCollects;
			var data = {};
			this.$api.req.get(url, data, (res) =>{
				console.log(res);
				this.posts = res.data.map((item, index) =>{
					return {
						id: index,
						userHeadImg: "http://"+item.imageUrl,
						title: item.title,
						publishTime: "8:00",
						content: item.content,
						userName: item.name,
						points: 10,
						watchNum: 43,
						commentNum: 2
					}
				})
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
					});
				});
			}
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
