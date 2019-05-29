<template>
	<view id="serch-result">
		<!-- 顶部搜索区域 -->
		<view class="search">
			<view class="search-box">
				<image src="/static/icons/search-gray.png" class="search-box-icon-search-in"></image>
				<input type="text" v-model="searchInput" placeholder="搜索" placeholder-class="search-box-input-placeholder" class="search-box-input"/>
				<image src="/static/icons/speech.png" class="search-box-icon-speech-in"></image>
			</view>
			<image src="/static/icons/search-black.png" class="search-icon-search" @click="searchPost"></image>
		</view>
		<view class="devide-line"></view>
		<!-- 搜索结果列表 -->
		<view v-for="(postItem, index) in posts" :key="postItem.id"
			:id="postItem.id" :data-index="index" @click="goDetail">
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
import {
	friendlyDate,
	cutString
} from '@/common/util.js';

	export default {
		data() {
			return {
				searchInput: "",
				searchHistroyList: [],
				posts: []
			}
		},
		onLoad(options) {
			console.log(options);
			this.searchInput = options.keyword;
			this.searchHistroyList = this.$store.state.searchHistroy;
			this.searchPost();
		},
		methods: {
			searchPost() {
				this.searchHistroyList.unshift(this.searchInput);	//向头部添加，这样最新的排在前面
				this.$store.commit("saveSearchHistroy", this.searchHistroyList);
				console.log(this.searchHistroyList, this.$store.state.searchHistroy);
				var url = this.$api.urls.searchPost + this.searchInput;
				var data = {};
				this.$api.req.get(url, data, (res) =>{
					console.log(res);
					if (res.data) {
						this.posts = res.data.map((item) =>{
							console.log(item.issueTime);
							return {
								id: item.postId,
								userId: item.userId,
								userHeadImg: "http://"+item.headImageUrl,
								title: item.title,
								publishTime: friendlyDate(new Date(item.issueTime.replace(/\-/g, '/').replace(/\T/g, ' ').substring(0, 19)).getTime()),
								content: cutString(item.content, 20),
								userName: item.userName,
								points: item.points, 
								watchNum: item.viewNum,
								commentNum: item.commentNum,
								approvalNum: item.approvalNum,
								reportNum: item.reportNum,
								postType: item.postType,
								helpUserId: item.helpUserId
							};
						});
					}
				})
			},
			
			goDetail(e) {
				var detail = {postId: this.posts[e.currentTarget.dataset.index].id};
				uni.navigateTo({
					url: '../post-detail/post-detail?query=' + encodeURIComponent(JSON.stringify(detail))
				});
			},
		},  
	}
</script>
<style lang="scss" scoped>
	@import "search-result.scss";
</style>
