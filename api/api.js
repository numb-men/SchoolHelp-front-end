import store from "../store/index.js";

// API 请求根路径
// var root = "http://250r7838l8.qicp.vip"
var root = "http://134.175.16.143:8080/schoolhelp-1.1.1";
// var root = "/schoolhelp"; // h5测试使用，使用了manifest.json中的h5代理配置

// API url路径
var urls = {
    register: `${root}/register`,
    login: `${root}/login`,
    logout: `${root}/logout`, //登出
    sendMessage: `${root}/user/message`,
    updateUserInfo: `${root}/user`,
    deleteCollect: `${root}/user/collect`,
    getMessage: `${root}/user/message`,
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
    searchPost: `${root}/post/search/`, //搜索关键词，+关键词
    getHotSearch: `${root}/post/search/hot`,
    getSearchHistroy: `${root}/user/searches`,
    deleteAllSearchHistroy: `${root}/user/searches`,
    deleteASearchHistroy: `${root}/user/search`,
    getAllUserComments: `${root}/user/comments`,
    deleteAPost: `${root}/post`,
    deleteAComment: `${root}/post/delete/comment`,
    getAllCollects: `${root}/user/collects`,
    getAttentions: `${root}/user/attention`,
    cancelAttention: `${root}/user/attention`,
    attentionSomeone: `${root}/user/attention`,
    getChatList: `${root}/message/chatlist`,
    getOtherUserInfo: `${root}/user/`, //获取其他用户的非隐私信息，+userId
    getMessageListForUser: `${root}/user/message/user`, //获取与对应用户的消息列表
    getSelfHeadImg: `${root}/download/head`, //获取用户自己的头像
    setMessageRead: `${root}/message/state`, //设置消息已读
    checkCertified: `${root}/user/checkCertified`, //判断用户Id列表是否已经认证
    submitPost: `${root}/post/submit`, //结贴

    /**********************************************/

    getMessageList: `${root}/user/message`,
    getSelfUserInfo: `${root}/user`,
    getHead: `${root}/download/head`,
    feedback: `${root}/feedback/`,
    getPostList: `${root}/post/pages`,
    changeUserInfomation: `${root}/user`,
    changePassword: `${root}/user/password`,
    postHead: `${root}/uploadimg/head`,
    getRollImage: `${root}/download/roll`
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
                console.log(res.data, method, url);
                if (res.data.code == 0) {
                    success(res.data);
                } else {
                    // 打印错误提示
                    uni.showToast({
                        icon: "none",
                        title: res.data.msg || "请求失败"
                    })
                    if (fail) fail(res.data);
                }
            },
            fail: (err) => {
                console.log(method, url, "fail");
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
    },

    // 获取用户信息
    getUserInfo() {
        var url = urls.getSelfUserInfo;
        var data = {};
        this.get(url, data, (res) => {
            let userInfo = res.data;
            store.commit("saveUserInfo", userInfo);
        });
    },

    // 登录，并且获取用户信息
    login(phone, password) {
        var url = urls.login;
        var data = {
            phone,
            password
        };
        this.get(url, data, (res) => {
			let token = res.data;
            store.commit("login", {token, phone, password});
            this.getUserInfo();
        });
    },

    // 注册，并获取用户信息
    register(phone, password) {
        var url = urls.register;
        var data = {
            phone,
            password
        };
        this.post(url, data, (res) => {
			let token = res.data;
            store.commit("login", {token, phone, password});
            this.getUserInfo();
        });
    },

    // 退出登录
    logout() {
        var url = urls.logout;
        var data = {};
        this.get(url, data, (res) => {
            store.commit("logout");
        })
    }
}

export default {
    root,
    urls,
    req
}
