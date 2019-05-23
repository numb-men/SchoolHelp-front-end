<template>
	<view class="content">
		<!-- 新建帖子输入盒 -->
		<view class="add-post-box">
			<view class="title-word-count">{{post.titleWordCount}}/15</view>
			<input type="text" :value="post.postTitle" placeholder="输入标题" placeholder-class="title-placeholder" class="post-title"
			 maxlength="15" focus="true" confirm-type="done" @input="bindTitleInput" />
			<view class="devide-line"></view>
			<textarea :value="post.postContent" placeholder="添加内容(至少10个字)" maxlength="3000" class="post-content"
			 placeholder-class="content-placeholder" @input="bindContentInput" />
			</view>
		<view class="content-word-count">{{post.contentWordCount}}/3000</view>
		<!-- 标签盒 -->
		<scroll-view scroll-x>
			<view class="tags-box">
				<view class="tag">添加标签</view>
				<view class="tag" v-for="(tag, index) in post.tags" :key="index" :id="'tag'+index">
					{{tag}}
				</view>
			</view>
		</scroll-view>
		<!-- 底部操作栏 -->
		<view class="add-post-bottom">
			<view class="row-left">
				<view class="set-points">设置分数</view>
				<view class="set-sort">设置分类</view>
			</view>
			<view class="row-right">
				<image src="../../../static/icons/emoji.png" class="normal-icon" mode=""></image>
				<image src="../../../static/icons/pic.png" class="normal-icon" mode=""></image>
				<view class="send" @tap="commitPost">发送</view>
			</view>
		</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
				post: {
					title: "",
					content: "",
					tags: ["标签1", "标签2", "标签3"],
					titleWordCount: 0,
					contentWordCount: 0
				}
            }
        },
        methods: {
			bindTitleInput: function(e){
				this.post.title = e.target.value;
				this.post.titleWordCount = e.target.value.length;
			},
			bindContentInput: function(e){
				this.post.content = e.target.value;
				this.post.contentWordCount = e.target.value.length;
			},
			commitPost: function(){
				if(this.post.titleWordCount<3){
					uni.showModal({
						content: "标题至少3个汉字",
						showCancel: false
					});
					return;
				}
				if(this.post.contentWordCount<5){
					uni.showModal({
						content: "帖子内容至少5个汉字",
						showCancel: false
					});
					return;
				}
				
				
				
				uni.navigateBack({
					delta: 1
				});
			}
        }
    }
</script>

<style lang="scss">
	@import "@/app.scss";
	.add-post-box {
		padding: 0 15upx;
	}
	.post-title {
		width: 100%;
		box-sizing: border-box;
		padding: 10upx 5upx;
		@include font(45upx, 50upx, #666, $align: left);
	}
	.title-placeholder {
		padding: 10upx 5upx;
		@include font(45upx, 50upx, #666, $align: left);
	}
	.post-content {
		width: 100%;
		box-sizing: border-box;
		height: 600upx;
		padding: 10upx 5upx;
		@include font(30upx, 40upx, #666, $align: left);
	}
	.title-word-count {
		@include font(22upx, 40upx, #666, $align: right);
	}
	.content-placeholder {
		@include font(30upx, 40upx, #666, $align: left);
		color: #c9c9c9;
	}
	.content-word-count {
		@extend .title-word-count;
		position: fixed;
		bottom: 190upx;
		right: 35upx;
	}
	.tags-box {
		@include row($space: left);
		padding: 15upx 10upx;
		position: fixed;
		bottom: 120upx;
		left: 0;
		min-width: 750upx;
		box-sizing: border-box;
	}
	.tag {
		@include font(28upx, 40upx, #666);
		height: 40upx;
		max-width: 120upx;
		padding: 5upx 10upx;
		border-radius: 5upx;
		margin: 0 5upx;
		background: #f6f6f6;
	}
	.add-post-bottom {
		@include row;
		width: 100%;
		height: 120upx;
		padding: 30upx 10upx;
		position: fixed;
		box-sizing: border-box;
		bottom: 0;
		left: 0;
		border-top: 1px solid #c9c9c9;
	}
	.row-left {
		@include row;
	}
	.set-points {
		@extend .tag;
	}
	.set-sort {
		@extend .tag;
	}
	.row-right {
		@include row;
		margin-right: 25upx;
	}
	.normal-icon {
		@include icon(40upx);
		margin: 7upx 15upx;
	}
	.send {
		@include font(32upx, 45upx, #fefefe);
		height: 45upx;
		padding: 5upx 15upx;
		border-radius: 5upx;
		background: rgb(0, 153, 255);
		margin-left: 25upx;
	}
</style>
