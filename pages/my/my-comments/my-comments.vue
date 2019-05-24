<template>
	<view id="my-comment">
		<!-- 评论数目 -->
		<view class="comment-num">
			{{commentNum}} 个评论
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
import App from '@/App';

export default {
	name: 'slide-list',
	data() {
		return {
			commentNum: 4,
			commentList: [
				{
					id: 1,
					postTitle: '锐捷租借，也可以半租',
					content: '一个月10元，要的话私聊，平常不怎么用网~',
					time: '2019-03-18'
				},
				{
					id: 2,
					postTitle: '哪里有卖口罩的？',
					content: '在三区快递街旁边一家文体店好像有。',
					time: '2019-03-18'
				},
				{
					id: 3,
					postTitle: '锐捷租借，也可以半租',
					content: '一个月8块，不能再少了~',
					time: '2019-03-18'
				},
				{
					id: 4,
					postTitle: '锐捷租借，也可以半租',
					content: '成交！',
					time: '2019-03-18'
				}
			]
		};
	},
	methods: {
	},
	onLoad() {
	}
};
</script>

<style lang="scss" scoped>
	@import "./my-comment.scss";
</style>
