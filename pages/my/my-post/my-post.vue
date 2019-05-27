<template>
	<view id="my-post" class="content">
		<!-- 帖子数目 -->
		<view class="post-num">
			{{postNum}} 个帖子
		</view>
		<!-- 帖子列表 -->
		<view v-for="(post, index) in postList" :key="post.id">
			<view class="post-box" :data-index="index" :id="post.id">
				<!-- 帖子内容 -->
				<view class="post-box-title">
					{{post.title}}
				</view>
				<!-- 帖子底部区域：时间、操作 -->
				<view class="post-box-bottom">
					<view class="post-box-bottom-time">{{post.time}}</view>
					<view class="post-box-bottom-operation">
						<view class="big-icon-box">
							<image src="/static/icons/edit.png" class="big-icon-box-icon"></image>
							<view class="big-icon-box-text">修改</view>
						</view>
						<view class="big-icon-box">
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
		
	name: 'my-post',
	data() {
		return {
			postIdList: [],
			postNum: 0,
			postList: []
		};
	},
	onLoad() {
		var url = this.$api.urls.getMyPosts;
		var data = {};
		this.$api.req.get(url, data, (res) =>{
			console.log(res);
			this.postIdList = res.data;
			this.postNum = res.data.length;
			this.getPosts();
		});
	},
	methods: {
		getPosts() {
			this.postIdList.map((postId) =>{
				var url = this.$api.urls.getEasyPost + postId;
				var data = {};
				this.$api.req.get(url, data, (res) =>{
					console.log(res);
					this.postList.push({
						id: res.data.postId,
						title: res.data.title,
						time: friendlyDate(new Date(res.data.issueTime.replace(/\-/g, '/').replace(/\T/g, ' ').substring(0, 19)).getTime())
					})
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	@import "./my-post.scss";
</style>
