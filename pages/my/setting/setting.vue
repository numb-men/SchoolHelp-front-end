<template>
	<view class="total">
		<view class="list-up">
			<view class="list-item border-bottom" @click="logoOut">
				<text class="list-text">账号与安全</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="list-mid">
			<view class="list-item border-bottom" @click="logoOut">
				<text class="list-text">意见反馈</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="list-item border-bottom" @click="logoOut">
				<text class="list-text">帮助</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="list-bottom">
			<view class="list-item border-bottom" @click="logoOut">
				<text class="list-text">退出登录</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {

			}
		},
		computed: mapState(['hasLogin', 'uerInfo']),
		methods: {
			...mapMutations(['logout']),
			logoOut() {
				if (this.hasLogin) {
					uni.showToast({
						icon: 'none',
						title: '注销成功',
					});
					this.logout();
					uni.navigateBack();
				} else {
					uni.showToast({
						icon: 'none',
						title: '您尚未登录哟~',
					});
				}
			},
			gotoDevelop() {
				uni.navigateTo({
					url: 'about/about'
				})
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	.total {
		background-color: #F2F2F2;
		flex-direction: column;
		width: 750upx;
	}

	.list-up {
		margin-top: 10upx;
		margin-bottom: 30upx;
	}

	.list-mid {
		margin-top: 10upx;
		margin-bottom: 30upx;
	}

	.list-bottom {
		margin-top: 10upx;
		margin-bottom: 30upx;
	}

	.list-item {
		justify-content: center;
		background-color: #FFFFFF;
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.list-item:active {
		background-color: #EEEEEE;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 38upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>
