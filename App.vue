<script>
	
	export default {
		onLaunch: function() {
			this.init();
		},
		methods: {
			// 获取用户信息，检查是否登录，如果已经登录，存储登录状态token和用户信息
			init(){
				/**
				 * TODO 开发环境 测试使用
				 */
				this.$store.commit("logout");
				this.$api.req.login("13067247166", "1515491ccc");
				// this.$api.req.register("13078901271", "12345abc");
				/*
				 * 
				**/
				this.$store.commit("getSearchHistroy");
				console.log(this.$store.state.searchHistroy);

				uni.getStorage({
					key: 'token',
					success: (res) =>{
						console.log("已登录");
						this.$store.commit("login", res.data)
						uni.getStorage({
							key: "userInfo",
							success: (res2) => {
								this.$store.commit("saveUserInfo", res2.data);
							}
						})
					},
					fail: (err) =>{
						console.log("未登录");
						console.log(err);
					}
				});
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	body,
	page {
		min-height: 100%;
		display: flex;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* .content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
	} */

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		text-align: right;
		width: 40%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
		/* background-color: #999999; */
	}
</style>
