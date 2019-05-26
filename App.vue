<script>
	import store from "./store/index.js";
	import api from "./api/api.js";
	
	export default {
		onLaunch: function() {
			this.init();
		},
		methods: {
			// 获取用户信息，检查是否登录，如果已经登录，存储登录状态token和用户信息
			init(){
				uni.getStorage({
					key: 'token',
					success: (res) =>{
						console.log("已登录");
						// this.login("13078901232", "12345abc");
						store.commit("login", res.data)
						uni.getStorage({
							key: "userInfo",
							success: (res2) => {
								store.commit("saveUserInfo", res2.data);
							}
						});
						// this.logout();
					},
					fail: (err) =>{
						console.log("未登录");
						/**
						 * 
						 * TODO 开发环境 测试使用
						 * 
						 */
						// this.login("13078901232", "12345abc");
					}
				});
			},
			// 登录，同时获取用户信息 
			login(phone, password) {
				console.log("模拟登录");
				var url = api.urls.login;
				var data = { phone, password };
				api.req.get(url, data, (res) => {
					store.commit("login", res.data);
					this.getUserInfo();
				});
			},
			// 获取用户信息
			getUserInfo() {
				var url = api.urls.getSelfUserInfo;
				var data = {};
				api.req.get(url, data, (res) => {
					let userInfo = res.data;
					delete userInfo.password;
					store.commit("saveUserInfo", userInfo);
				});
			},
			addFeedback() {
				uni.request({
					url: "http://24l687f160.qicp.vip:43882/feedback/",
					data: { feedbackContent: "1235gfasgasdga" },
					method: "POST",
					header: {
						//取值：application/json(默认) / application/x-www-form-urlencoded
						'content-type': 'application/json', 
						'token': store.state.token	//默认携带token，未登录时，token为''
					},
					success: (res) => {
						console.log(res.data);
					},
					fail: (err) => {
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

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 20upx;
	}

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
		text-align: left;
		width: 35%;
		height: 50upx;
		min-height: 50upx;
		font-size: 34upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 60upx;
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
