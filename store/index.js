import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		hasLogin: false,
		token: '',
		searchHistroy: []
	},
	mutations: {
		// 保存登录状态
		login(state, token) {
			state.hasLogin = true
			state.token = token
			console.log("save token", token)
			uni.setStorage({
				key: 'token',
				data: token
			})
		},
		// 登出，清空登录状态，同时清空用户信息
		logout(state) {
			state.hasLogin = false
			this.commit("clearUserInfo")
			uni.removeStorage({
				key: 'token'
			})
		},
		// 保存用户信息
		saveUserInfo (state, userInfo) {
			state.userInfo = userInfo
			console.log("save userInfo", userInfo)
			uni.setStorage({
				key: 'userInfo',
				data: userInfo
			})
		},
		// 清空用户信息
		clearUserInfo(state) {
			state.userInfo = {}
			uni.removeStorage({
				key: 'userInfo'
			})
		},
		// 删除某条搜索历史
		deleteASearchHistroy(state, index) {
			state.searchHistroy.splice(index, 1);
		},
		// 获取搜索历史
		getSearchHistroy(state) {
			uni.getStorage({
				key: "searchHistroy",
				success: (res) => {
					state.searchHistroy = res.data;
				},
				fail: (err) => {
					state.searchHistroy = [];
					console.log(err);
				}
			})
		},
		// 清空搜索历史
		clearSearchHistroy(state) {
			state.searchHistroy = [];
			uni.removeStorage({
				key: 'searchHistroy'
			})
		},
		// 保存搜索历史
		saveSearchHistroy(state, searchHistroy) {
			state.searchHistroy = searchHistroy;
			uni.setStorage({
				key: "searchHistroy",
				data: searchHistroy
			});
		}
	}
})

export default store
