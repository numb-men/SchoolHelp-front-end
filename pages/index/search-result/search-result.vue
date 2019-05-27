<template>
	<view id="serch-result">
		<!-- 顶部搜索区域 -->
		<view class="search">
			<view class="search-box">
				<image src="/static/icons/search-gray.png" class="search-box-icon-search-in"></image>
				<input type="text" v-model="searchInput" placeholder="搜索" placeholder-class="search-box-input-placeholder" class="search-box-input"/>
				<image src="/static/icons/speech.png" class="search-box-icon-speech-in"></image>
			</view>
			<image src="/static/icons/search-black.png" class="search-icon-search"></image>
		</view>
		<view class="devide-line"></view>
		<!-- 搜索结果列表 -->
		<view v-for="(postItem, index) in posts" :key="postItem.id"
			:id="postItem.id" :data-index="index">
			<view class="post-item">
				<view class="post-item-top">
					<view class="post-item-top-title">{{postItem.title}}</view>
					<view class="post-item-top-publish-time">{{postItem.publishTime}}</view>
				</view>
				<view class="post-item-center">
					{{postItem.content}}
				</view>
				<view class="post-item-bottom">
					<view class="post-item-bottom-user-box">
						<image :src="postItem.userHeadImg" class="post-item-bottom-user-box-head-img"></image>
						<view class="post-item-bottom-user-box-name">{{postItem.userName}}</view>
					</view>
					<view class="post-item-bottom-points">
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
			
		},
		methods: {
		},
	}
</script>
<style lang="scss" scoped>
	@import "search-result.scss";
</style>
