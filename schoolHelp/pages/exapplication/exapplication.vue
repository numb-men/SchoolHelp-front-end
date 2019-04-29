<template>
	<view>
		<html>
			<body>
				<div class="wrapper">
					<div class="box-wrap">
						<div class="box-wrap-left" @click="gotoQuestionaire()">
							<image class="exappImage" src="../../static/wenjuandiaocha.png" />
							<p>问卷调查</p>
						</div>
						<div class="box-wrap-left">
							<image class="exappImage" src="../../static/kechengbiao.png" />
							<p>课程表</p>
						</div>
						<div class="box-wrap-left">
							<image class="exappImage" src="../../static/kongjiaoshi.png" />
							<p>空教室</p>
						</div>
					</div>
					<div class="box-wrap">
						<div class="box-wrap-left">
							<image class="exappImage" src="../../static/zidongpingyi.png" />
							<p>自动评议</p>
						</div>
						<div class="box-wrap-left">
							<image class="exappImage" src="../../static/kaoshianpai.png" />
							<p>考试安排</p>
						</div>
						<div class="box-wrap-left">
							<image class="exappImage" src="../../static/kandianpu.png" />
							<p>看店铺</p>
						</div>
					</div>
					<div class="box-wrap">
						<div class="box-wrap-left">
							<image class="exappImage" src="../../static/biaobaiqiang.png" />
							<p>表白墙</p>
						</div>
					</div>
					<div class="push"></div>
				</div>
				<footer class="footer">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
								<swiper-item>
									<image src="../../static/add1.png" class="adds"></image>
								</swiper-item>
								<swiper-item>
									<image src="../../static/add2.png" class="adds"></image>
								</swiper-item>
								<swiper-item>
									<image src="../../static/add3.png" class="adds"></image>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</footer>
			</body>
		</html>
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
					url: '/pages/exapplication/questionnaire/questionnaire'
				});
			}
		}
	}
</script>

<style>
	.wrapper {
		min-height: 100%;
		margin-bottom: 70px;
	}

	body,
	html {
		height: 100%;
		margin: 0;
	}

	.footer,
	.push {
		height: 70px;
	}

	.swiper {
		height: 300upx;
	}

	.adds {
		width: 100%;
		height: 100%;
	}

	.exappImage {
		text-align: center;
		border-radius: 30px;
		margin-top: 2px;
		width: 60px;
		height: 60px;
		max-width: 100%;
		max-height: 100%;
	}

	.box-wrap {
		flex-direction: row;
		width: 360px;
		text-align: center;
		background-color: #FFFFFF;
		overflow: hidden;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.box-wrap-left {
		float: left;
		border: 1px solid #CCCCCC;
		width: 100px;
		height: 100px;
		/* width: 30%;
		padding-bottom: 25%; */
		/* margin-left: 10px; */
		margin-top: 5px;
		/* margin: 0 auto; */
		border-radius: 10%;
		background-color: FFFFFF;
	}

	.box-wrap-left:active {
		background-color: #eeeeee;
	}

	.box-wrap-center {
		float: left;
		border: 1px solid #CCCCCC;
		width: 100px;
		height: 100px;
		/* padding-bottom: 25%; */
		margin-top: 5px;
		margin-left: 17px;
		/* margin: 0 auto; */
		border-radius: 10%;
		background-color: FFFFFF;
	}

	.box-wrap-center:active {
		background-color: #eeeeee;
	}

	.box-wrap-right {
		/* display: inline; */
		float: right;
		border: 1px solid #CCCCCC;
		width: 100px;
		height: 100px;
		/* width: 30%;
		padding-bottom: 25%; */
		margin-right: 10px;
		margin-top: 5px;
		border-radius: 10%;
		background-color: FFFFFF;
	}

	.box-wrap-right:active {
		background-color: #eeeeee;
	}
</style>
