<template>
	<view>
		<view class="content">
			<!-- 消息列表 -->
			<view class="msg-item" v-for="(msgItem, index) in msgs" :key="msgItem.id" 
				:data-index="index" :id="msgItem.id" @tap="showMsgDetail">
				<!-- 左侧头像 -->
				<image class="chat-user-head-img" :src="msgItem.chatUserHeadImg" mode=""></image>
				<!-- 中间用户名和最新聊天内容 -->
				<view class="msg-item-center">
					<view class="chat-user-name">
						{{msgItem.chatUserName}}
					</view>
					<view class="latest-msg-content">
						{{msgItem.latestMsgContent}}
					</view>
				</view>
				<!-- 右侧时间和未读消息数目 -->
				<view class="msg-item-right">
					<view class="latest-msg-time">
						{{msgItem.latestMsgTime}}
					</view>
					<!-- 判断未读消息数目是否为0，为0隐藏 -->
					<view class="not-read-msg-num" v-if="msgItem.notReadMsgNum != '0'">
						{{msgItem.notReadMsgNum}}
					</view>
					<view class="not-new-message" v-else></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		friendlyDate,
		cutString
	} from "@/common/util.js";
	import api from "../../api/api.js";
	
	export default {
		data() {
			return {
				msgs: [
					{
						id: 1,
						chatUserHeadImg: "/static/images/img_1.jpg",
						chatUserName: "小马达",
						latestMsgContent: "你什么时候回家？",
						notReadMsgNum: 1,
						latestMsgTime: "7:00"
					},
					{
						id: 2,
						chatUserHeadImg: "/static/images/img_2.jpg",
						chatUserName: "真有钱",
						latestMsgContent: "你需要钱吗？我借钱给你，5千够吗？",
						notReadMsgNum: 1,
						latestMsgTime: "14:00"
					},
					{
						id: 3,
						chatUserHeadImg: "/static/images/img_3.jpg",
						chatUserName: "好厉害",
						latestMsgContent: "我真的太菜了，还是你厉害。",
						notReadMsgNum: 0,
						latestMsgTime: "19:00"
					},
					{
						id: 4,
						chatUserHeadImg: "/static/images/img_4.jpg",
						chatUserName: "真滴烦",
						latestMsgContent: "哇哇哇——啊啊啊——好气啊——气死我了——啊啊啊——",
						notReadMsgNum: 100,
						latestMsgTime: "5-3"
					},
				]
			}
		},
		onLoad: function() {
			for (var msgItem of this.msgs) {
				// 裁剪过长的消息内容
				msgItem.latestMsgContent = cutString(msgItem.latestMsgContent, 15);
				// 隐藏过多的未读消息
				msgItem.notReadMsgNum = (msgItem.notReadMsgNum > 99 ? '99+' : ''+msgItem.notReadMsgNum);
			}
			var url = api.urls.getMessageList;
			var data = {};
			// 延时请求，防止请求之前还未登录
			setTimeout(() =>{
				api.req.get(url, data, (res) =>{
					console.log(res);
				});
			}, 1000);
			// 发送消息接口
			
			var url2 = api.urls.sendMessage;
			var data2 = { accept: 138}
			setTimeout(() =>{
				console.log(data2, url2);
				api.req.post(url2, data2, (res) =>{
					console.log(res);
				});
			}, 1000);
		},
		methods: {
			showMsgDetail: function(e){
				let msgId = e.currentTarget.id;
				// let msgIndex = e.currentTarget.dataset.index;
				// console.log(msgId, msgIndex);
				uni.navigateTo({
					url: "message-detail/message-detail?msgId=" + msgId
				});
			}
		}
	}
</script>

<style lang="scss">
	@import '@/app.scss';
	.msg-item {
		@include row;
		padding: 10upx;
	}
	.chat-user-head-img {
		@include circle(100upx);
		margin: 27upx 5upx;
		margin-right: 25upx;
	}
	.msg-item-center {
		@include column($space: space-around);
		width: 480upx;
	}
	.chat-user-name {
		@include font(34upx, 55upx, $align: left, $bold: bold, $color: #666);
		padding-top: 15upx;
	}
	.latest-msg-content {
		@include font(30upx, 35upx, $align: left, $color: #666);
		height: 60upx;
	}
	.msg-item-right {
		@include column($space: space-around);
		width: 80upx;
	}
	.latest-msg-time {
		@include font(28upx, 55upx, $align: center);
		width: 100%;
	}
	.not-read-msg-num {
		@include like-ellipse(36upx, red);
		@include font(22upx, 36upx, white);
		padding: 0 5upx;
		margin: 10upx auto;
	}
	.not-new-message {
		width: 75upx;
		height: 60upx;
	}
</style>
