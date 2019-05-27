import store from "../store/index.js";

// API 请求根路径
var root = "http://134.175.16.143:8080/schoolhelp-1.0.3";
// var root = "/schoolhelp/schoolhelp-1.0.3"; // h5测试使用，使用了manifest.json中的h5代理配置

// API url路径
var urls = {
	register: `${root}/register`,
	login: `${root}/login`,
	sendMessage: `${root}/user/message`,
	updateUserInfo: `${root}/user`,
	deleteCollect: `${root}/user/collect`,
	getMessageList: `${root}/user/message`,
	getSelfUserInfo: `${root}/user`,
	sendPost: `${root}/post`,
	getPostDetail: `${root}/post/id/`, //获取帖子详情，+id
	addComment: `${root}/post/comment`,
	getAllComments: `${root}/post/comment/all/`, //获取帖子所有评论，+id
	collectPost: `${root}/user/collect`,
	approvalPost: `${root}/post/approval`,
	reportPost: `${root}/post/report`,
	getMyPosts: `${root}/user/post`,
	getEasyPost: `${root}/post/id/brief/`, //获取帖子简要信息，+id
}

// 封装请求方法
var req = {
	request(url, data, method, success, fail) {
		uni.request({
			url: url,
			data: data,
			method: method,
			header: {
				//取值：application/json(默认) / application/x-www-form-urlencoded
				'content-type': 'application/x-www-form-urlencoded', 
				'token': store.state.token	//默认携带token，未登录时，token为''
			},
			success: (res) => {
				console.log(method, url, res.data);
				success(res.data);
			},
			fail: (err) => {
				if (fail) fail(err);  // 如果失败方法非空，执行失败方法
			}
		});
	},
	get(url, data, success, fail) {
		this.request(url, data, 'GET', success, fail);
	},
	post(url, data, success, fail) {
		this.request(url, data, 'POST', success, fail);
	},
	put(url, data, success, fail) {
		this.request(url, data, 'PUT',  success, fail);
	},
	del(url, data, success, fail) {
		this.request(url, data, 'DELETE', success, fail);
	},
	
	// 获取用户信息
	getUserInfo(){
		var url = urls.getSelfUserInfo;
		var data = {};
		this.get(url, data, (res) => {
			let userInfo = res.data;
			delete userInfo.password;
			store.commit("saveUserInfo", userInfo);
		});
	},
	
	// 登录，并且获取用户信息
	login(phone, password) {
		var url = urls.login;
		var data = { phone, password };
		this.get(url, data, (res) => {
			store.commit("login", res.data);
			this.getUserInfo();
		});
	},
	
	// 注册，并获取用户信息
	register(phone, password) {
		var url = urls.register;
		var data = { phone, password };
		this.post(url, data, (res) => {
			store.commit("login", res.data);
			this.getUserInfo();
		});
	}
}

export default {
	root,
	urls,
	req
}