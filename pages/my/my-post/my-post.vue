<template>
	<view @click="goBack">
		<view class="message-num">{{ message_num }}条提问</view>
		<view class="index" v-bind:style="[{ 'min-height': secondHeight + 'px' }]">
			<view class="list-box">
				<view style="margin-top: 10upx;"></view>
				<view class="container_of_slide" v-for="(item, index) in list" :key="index">
					<view class="now-message-info" hover-class="uni-list-cell-hover" :style="{ width: Screen_width + 'px' }" @click="getDetail(item)">
						<view class="list-right">
							<view class="list-title" v-if="item.name">{{ item.name }}</view>
							<view class="list-detail">{{ item.remarks }}</view>
							<view class="list-left-1">
								{{ item.dateTime }}
								<view class="list-right-1">修改 删除</view>
							</view>
						</view>
					</view>
					<view style="clear:both"></view>
				</view>
				<view class="end-message">没有更多内容</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'slide-list',
	computed: {
		Screen_width() {
			return uni.getSystemInfoSync().windowWidth;
		}
	},
	data() {
		return {
			message_num: 4,
			list: [
				{
					id: 1,
					name: '锐捷租借',
					dateTime: '2019-03-18',
					remarks: '...'
				},
				{
					id: 2,
					name: '锐捷租借',
					dateTime: '2019-03-17',
					remarks: '...'
				},
				{
					id: 3,
					name: '锐捷租借',
					dateTime: '2019-03-18',
					remarks: '...'
				},
				{
					id: 4,
					name: '锐捷租借',
					dateTime: '2019-03-18',
					remarks: '...'
				}
			],
			secondHeight: ''
		};
	},
	onShow() {
		const res = uni.getSystemInfoSync();
		// 计算主体部分高度,单位为px
		this.secondHeight = res.windowHeight;
	},
	methods: {
		goBack(){
			uni.navigateTo({
				url:"../contents/contents"
			})
		},
		getDetail(item) {
			console.log('查看详情');
		}
	}
};
</script>

<style scoped>
.index {
	background: #f8f8f8;
}
.list-box {
	padding: 10upx 0;
}
.container_of_slide {
	width: 100%;
	overflow: hidden;
}
.now-message-info {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	clear: both;
	height: 200upx;
	padding: 0 5upx;
	margin-bottom: 10upx;
	background: #ffffff;
}
.list-right {
	margin-left: 25upx;
	font-size: 25upx;
}
.list-left-1 {
	float: left;
	padding-top: 20upx;
	color: #a9a9a9;
}
.list-right-1 {
	float: right;
	color: #a9a9a9;
	padding-left: 400upx;
}
.list-title {
	overflow: hidden;
	font-size: 35upx;
	margin-bottom: 10upx;
	color: #696969;
	overflow: hidden;
}
.list-detail {
	width: 350upx;
	font-size: 25upx;
	color: #999999;
	padding: 5upx;
	overflow: hidden;
}
.end-message {
	text-align: center;
	font-size: 30upx;
	color: #999999;
	padding-top: 5upx;
}
.message-num {
	font-size: 35upx;
	color: #999999;
	padding: 5upx;
	background: #f8f8f8;
}
.uni-list-cell-hover {
	background-color: #eeeeee;
}
</style>
