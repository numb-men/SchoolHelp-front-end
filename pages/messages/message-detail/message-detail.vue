<template>
	<view id="message-detail" class="content">
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
			<input class="msg-input" maxlength="200" placeholder="输入..." v-model="messageInput"/>
			<image class="msg-input-icon" src="/static/icons/send.png" @click="sendMessage"></image>
		</view>
	</view>
</template>

<script>
	import {
		friendlyDate
	} from '@/common/util.js';
	
	export default {
		data() {
			return {
				myUserId: "",
				myHeadImg: "",
				messageInput: "",
				chat: {
					userName: "",
					userHeadImg: "",
					userId: "",
					isOnline: "",
					msgs: []
				}
			}
		},
		onLoad: function(option) {
			var detail = JSON.parse(option.detail);
			this.myUserId = this.$store.state.userInfo.id;
			this.chat.userHeadImg = detail.chatUserHeadImg;
			this.chat.userName = detail.chatUserName;
			this.chat.userId = detail.chatUserId;
			this.chat.isOnline = detail.chatUser.online;
			console.log(detail.chatUser.online);
			this.getSelfHeadImg();
			this.getMessageList();
			uni.setNavigationBarTitle({
				title: this.chat.userName + `（${this.chat.isOnline?"在线":"离线"}）`
			});
		},
		methods: {
			getSelfHeadImg() {
				var url = this.$api.urls.getSelfHeadImg;
				var data = {};
				this.$api.req.get(url, data, (res) =>{
					this.myHeadImg = "http://"+res.data;
				})
			},
			getMessageList() {
				var url = this.$api.urls.getMessageListForUser;
				var data = { accept: this.chat.userId };
				this.$api.req.get(url, data, (res) =>{
					this.chat.msgs = res.data.map((item, index) =>{
						return {
								id: index,
								sendTime: friendlyDate(new Date(item.sendTime.replace(/\-/g, '/').replace(/\T/g, ' ').substring(0, 19)).getTime()),
								isMe: item.send==this.myUserId,
								msgContent: item.messageContent
							}
					})
				})
			},
			sendMessage() {
				var url = this.$api.urls.sendMessage;
				var data = { messageContent: this.messageInput, accept: this.chat.userId };
				this.$api.req.post(url, data, (res) =>{
					console.log(res);
					this.getMessageList();
				})
			}
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
