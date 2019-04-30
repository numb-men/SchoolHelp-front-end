<template>
	<view>
		<view class="list-item border-bottom" @click="logoOut">
			<text class="list-text">注销</text>
		</view>
		<view class="list-item border-bottom" @click="gotoDevelop">
			<text class="list-text">关于应用及其parents</text>
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
	.list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.list-item:active {
		background-color: #eeeeee;
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
</style>
