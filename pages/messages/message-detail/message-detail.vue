<template>
	<view class="content">
		<block v-for="(msgItem, index) in chat.msgs" :key="msgItem.id">
			<view class="chat-box" :data-index="index" :id="msgItem.id">
				<!-- 对方发的消息 头像在左边 -->
				<image v-if="!msgItem.isMe" :src="myHeadImg" class="chat-user-head-img-left" mode=""></image>
				<view class="auto-box">
					<view v-if="msgItem.isMe" class="no-use"></view>
					<view class="chat-content">
						<!-- 消息内容 -->
						<view :class="msgItem.isMe ? 'msg-content-me':'msg-content-user'">
							{{msgItem.msgContent}}
						</view>
						<!-- 发送时间 -->
						<view class="msg-send-time">
							{{msgItem.sendTime}}
						</view>
					</view>
					<view v-if="!msgItem.isMe" class="no-use"></view>
				</view>
				<!-- 本人发的消息 头像在右边 -->
				<image v-if="msgItem.isMe" :src="chat.userHeadImg" class="chat-user-head-img-right" mode=""></image>
			</view>
		</block>
		<view class="end"></view>
		<view class="msg-input-box">
			<input class="msg-input" maxlength="200" placeholder="输入..." />
			<image class="msg-input-icon" src="/static/icons/send.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myHeadImg: "/static/images/img_3.jpg",
				chat: {
					userName: "Lora",
					userHeadImg: "/static/images/img_4.jpg",
					msgs: [
						{
							id: 1,
							sendTime: "11:05",
							isMe: true,
							msgContent: "你的快递我拿了，你看什么时候我给你拿一下。"
						},
						{
							id: 2,
							sendTime: "12:15",
							isMe: false,
							msgContent: "太谢谢啦，下午五点送到6#809行吗？"
						},
						{
							id: 3,
							sendTime: "12:17",
							isMe: true,
							msgContent: "809?????你妹啊，不是最高6楼吗？"
						},
						{
							id: 4,
							sendTime: "12:19",
							isMe: false,
							msgContent: "sorry，打错了，是309..."
						},
						{
							id: 5,
							sendTime: "12:20",
							isMe: true,
							msgContent: "ok."
						},
						{
							id: 6,
							sendTime: "12:20",
							isMe: true,
							msgContent: "ok."
						},
						{
							id: 7,
							sendTime: "12:20",
							isMe: true,
							msgContent: "ok."
						}
					]
				}
			}
		},
		onLoad: function(option) {
			var msgId = option.msgId;
			console.log(msgId);
			uni.setNavigationBarTitle({
				title: this.chat.userName
			});
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import "@/app.scss";
	.no-use {
		width: 80upx;
	}
	.chat-box {
		@include row;
		padding: 25upx 0;
	}
	.auto-box {
		@include row;
		width: 615upx;
	}
	.chat-content {
		@include column($space: space-around);
	}
	%msg-content {
		max-width: 450upx;
		min-width: 80upx;
		padding: 10upx 25upx;
		border-radius: 15upx;
		@include font(34upx, 60upx, $color: #343131, $align: left);
	}
	.msg-content-me {
		@extend %msg-content;
		background: rgb(237, 237, 242);
	}
	.msg-content-user {
		@extend %msg-content;
		background: rgb(237, 242, 237);
	}
	.msg-send-time {
		@include font(25upx, 35upx, $align: right);
	}
	.chat-user-head-img-left {
		@include circle(85upx);
		margin: 5upx 25upx 35upx 20upx;
	}
	.chat-user-head-img-right {
		@include circle(85upx);
		margin: 5upx 20upx 35upx 25upx;
	}
	.end {
		width: 100%;
		height: 130upx;
	}
	.msg-input-box {
		@include row;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 730upx;
		height: 110upx;
		padding: 5upx 10upx;
		background: #f1f1f1;
	}
	.msg-input {
		border: 1px solid #eee;
		border-radius: 4upx;
		margin: 20upx 30upx;
		margin-right: 0;
		@include font(34upx, 35upx, $align: left, $color: #343131);
		padding: 6upx 10upx;
		width: 560upx;
		background: #fefefe;
	}
	.msg-input-icon {
		width: 50upx;
		height: 50upx;
		margin: 30upx 0;
		margin-right: 30upx;
	}
</style>
