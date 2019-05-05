<template>
	<view class="page" @click="goBack()">
		<view class="feedback-body">
			<textarea placeholder="请输入遇到的问题或建议..." v-model="sendDate.content" class="feedback-textare" />
			<view class="word-count">{{ wordCount }}/400</view>
		</view>
		<button type="primary" class="feedback-submit" @tap="send">提交</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			wordCount: 0,
			sendDate: {
				content: ''
			}
		};
	},
	onLoad() {},
	methods: {
		goBack(){
			uni.navigateBack({
				delta: 1
			})
		}
	}
};
</script>

<style>
page {
	background-color: #efeff4;
}
view {
	font-size: 25upx;
}
.word-count {
	text-align: right;
	padding: 5upx;
	color: #a9a9a9;
}
.feedback-body {
	background: #fff;
}
.feedback-textare {
	height: 500upx;
	font-size: 34upx;
	line-height: 50upx;
	width: 750upx;
	box-sizing: border-box;
	padding: 20upx 30upx 0;
}
.feedback-submit {
	background-color: #00bfff;
	color: #ffffff;
	margin: 50upx;
	border-radius: 150upx;
	font-size: 35upx;
}
</style>
