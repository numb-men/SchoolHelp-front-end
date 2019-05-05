<template>
	<view class="basicStyle">
		<view class="box-wrap">
			<view class="box-wrap-item" @click="gotoQuestionaire()">
				<image class="exapp-image" src="../../static/icons/wenjuandiaocha.png" />
				<text style="display: block;">问卷调查</text>
			</view>
			<view class="box-wrap-item">
				<image class="exapp-image" src="../../static/icons/kechengbiao.png" />
				<text style="display: block;">课程表</text>
			</view>
			<view class="box-wrap-item">
				<image class="exapp-image" src="../../static/icons/kongjiaoshi.png" />
				<text style="display: block;">空教室</text>
			</view>
		</view>
		<view class="box-wrap">
			<div class="box-wrap-item">
				<image class="exapp-image" src="../../static/icons/zidongpingyi.png" />
				<text style="display: block;">自动评议</text>
			</div>
			<div class="box-wrap-item">
				<image class="exapp-image" src="../../static/icons/kaoshianpai.png" />
				<text style="display: block;">考试安排</text>
			</div>
			<div class="box-wrap-item">
				<image class="exapp-image" src="../../static/icons/kandianpu.png" />
				<text style="display: block;">看店铺</text>
			</div>
		</view>
		<view class="box-wrap">
			<div class="box-wrap-item">
				<image class="exapp-image" src="../../static/icons/biaobaiqiang.png" />
				<text style="display: block;">表白墙</text>
			</div>
		</view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item>
				<image src="http://pqty9tq3p.bkt.clouddn.com/3b0d0f28-411b-4886-8f3f-e2a0e3589193" class="adds"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/images/add2.png" class="adds"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/images/add3.png" class="adds"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			gotoQuestionaire() {
				uni.navigateTo({
					url: '/pages/extensions/questionaire/questionaire'
				});
			}
		}
	}
</script>

<style>
	.basicStyle {
		width: 100%;
		height: 100%;
	}

	.box-wrap {
		display: flex;
		width: 100%;
		text-align: center;
		background-color: #FFFFFF;
		flex-direction: row;
		justify-content: space-around;
	}

	.box-wrap-item {
		border: 1px solid #CCCCCC;
		width: 100px;
		height: 100px;
		margin-top: 5px;
		border-radius: 10%;
		background-color: FFFFFF;
	}

	.box-wrap-item:active {
		background-color: #eeeeee;
	}

	.swiper {
		margin-top: 100upx;
		height: 300upx;
	}

	.adds {
		width: 100%;
		height: 100%;
	}

	.exapp-image {
		text-align: center;
		border-radius: 30px;
		margin-top: 2px;
		width: 60px;
		height: 60px;
		max-width: 100%;
		max-height: 100%;
	}



	.btn-plusempty {
		z-index: 999;
		width: 110upx;
		height: 110upx;
		background: #007bfa;
		position: fixed;
		bottom: 50upx;
		right: 20upx;
		border-radius: 100%;
		overflow: hidden;
		text-align: center;
		line-height: 110upx;
	}

	.bottom-btn-hover {
		background: #0564c7 !important;
	}

	.plusempty-img {
		width: 50upx;
		height: 50upx;
		margin-top: 30upx;
	}
</style>
