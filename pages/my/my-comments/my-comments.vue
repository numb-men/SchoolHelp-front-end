<template>
	<view id="my-comment">
		<!-- 评论数目 -->
		<view class="comment-num">
			{{commentList.length}} 个评论
		</view>
		<!-- 评论列表 -->
		<view v-for="(comment, index) in commentList" :key="comment.id">
			<view class="comment-box" :data-index="index" :id="comment.id">
				<!-- 评论内容 -->
				<view class="comment-box-content">
					{{comment.content}}
				</view>
				<!-- 帖子标题 -->
				<view class="comment-box-post-title">
					{{comment.postTitle}}
				</view>
				<!-- 评论底部区域：时间、操作 -->
				<view class="comment-box-bottom">
					<view class="comment-box-bottom-time">{{comment.time}}</view>
					<view class="comment-box-bottom-operation">
						<!-- <view class="big-icon-box">
							<image src="/static/icons/edit.png" class="big-icon-box-icon"></image>
							<view class="big-icon-box-text">修改</view>
						</view> -->
						<view class="big-icon-box" @click="deleteAComment" :data-index="index">
							<image src="/static/icons/delete.png" class="big-icon-box-icon"></image>
							<view class="big-icon-box-text">删除</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 分割线 -->
			<view class="devide-line"></view>
		</view>
	</view>
</template>

<script>
import {
	friendlyDate
} from '@/common/util.js';

export default {
	name: 'slide-list',
	data() {
		return {
			commentList: []
		};
	},
	methods: {
		loadPostData() {
			this.commentList.map((item, index) =>{
				var url = this.$api.urls.getEasyPost + item.postId;
				var data = {};
				this.$api.req.get(url, data, (res) =>{
					item.postTitle = res.data.title;
					item.post = res.data;
				})
			})
		},
		deleteAComment(e) {
			console.log(e);
			var url = this.$api.urls.deleteAComment;
			var data = {commentId: this.commentList[e.currentTarget.dataset.index].id};
			this.$api.req.del(url, data, (res) =>{
				console.log(res);
				this.commentList.splice(e.currentTarget.dataset.index, 1);
				uni.showToast({
					icon: "none",
					title: "删除成功"
				})
			})
		}
	},
	onLoad() {
		var url = this.$api.urls.getAllUserComments;
		var data = {};
		this.$api.req.get(url, data, (res) =>{
			console.log(res);
			this.commentList = res.data.map((item) =>{
				return {
					id: item.commentId,
					userId: item.userId,
					postId: item.postId,
					postTitle: "",
					post: {},
					commentUserName: item.commentUserName,
					content: item.commentContent,
					time: friendlyDate(new Date(item.commentTime.replace(/\-/g, '/').replace(/\T/g, ' ').substring(0, 19)).getTime()),
					headImageUrl: "http://"+item.headImageUrl
				}
			});
			this.loadPostData();
		})
	}
};
</script>

<style lang="scss" scoped>
	@import "./my-comment.scss";
</style>
