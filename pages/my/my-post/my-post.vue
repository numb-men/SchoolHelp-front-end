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
export default {
	name: 'my-post',
	data() {
		return {
			postNum: 4,
			postList: [
				{
					id: 1,
					title: '锐捷租借，也可以半租',
					time: '2019-03-18'
				},
				{
					id: 2,
					title: '哪里有卖口罩的？',
					time: '2019-03-16'
				},
				{
					id: 3,
					title: '晚上教学区几点熄灯啊？',
					time: '2019-03-15'
				},
				{
					id: 4,
					title: '求高数复习资料！',
					time: '2019-03-10'
				}
			]
		};
	},
	onLoad() {
		
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
	@import "./my-post.scss";
</style>
