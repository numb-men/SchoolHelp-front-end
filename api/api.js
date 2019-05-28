import store from "../store/index.js";

// API 请求根路径
var root = "http://134.175.16.143:8080/schoolhelp-1.0.5";
// var root = "http://24l687f160.qicp.vip:43882";
// var root = "/schoolhelp/schoolhelp-1.0.1"; // h5测试使用

// API url路径
var urls = {
	login: `${root}/login`,
	register: `${root}/register`,
	sendMessage: `${root}/user/message`,
	updateUserInfo: `${root}/user`,
	deleteCollect: `${root}/user/collect`,
	getMessageList: `${root}/user/message`,
	getSelfUserInfo: `${root}/user`,
	getHead: `${root}/download/head`,
	feedback: `${root}/feedback/`,
	getPostList:`${root}/post/pages`
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
				'token': store.state.token //默认携带token，未登录时，token为''
			},
			success: (res) => {
				console.log(method, url, res.data);
				success(res.data);
			},
			fail: (err) => {
				if (fail) fail(err); // 如果失败方法非空，执行失败方法
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
		this.request(url, data, 'PUT', success, fail);
	},
	del(url, data, success, fail) {
		this.request(url, data, 'DELETE', success, fail);
	}
}

export default {
	root,
	urls,
	req
}
