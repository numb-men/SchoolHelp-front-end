import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		hasLogin: false,
		token: ''
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
			this.clearUserInfo()
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
		}
	}
})

export default store
