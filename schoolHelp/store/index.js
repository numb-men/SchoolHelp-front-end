import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		uerInfo: {},
		hasLogin: false,
		token: ''
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true
			state.uerInfo.token = provider.token
			state.uerInfo.userName = provider.name
			state.token = provider.token

			state.uerInfo.fallow = provider.fallow
			state.uerInfo.collect = provider.collect
			state.uerInfo.points = provider.points
			state.uerInfo.post = provider.post
			state.uerInfo.comment = provider.comment
			uni.setStorage({
				key: 'uerInfo',
				data: provider
			})
		},
		logout(state) {
			state.hasLogin = false
			state.uerInfo = {}
			uni.removeStorage({
				key: 'uerInfo'
			});
		}
	}
})


// const store = new Vuex.Store({
//     state: {
//         /**
//          * 是否需要强制登录
//          */
//         forcedLogin: false,
//         hasLogin: false,
//         userName: ""
//     },
//     mutations: {
//         login(state, userName) {
//             state.userName = userName || '新用户';
//             state.hasLogin = true;
//         },
//         logout(state) {
//             state.userName = "";
//             state.hasLogin = false;
//         }
//     }
// })

export default store
