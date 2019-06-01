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
        login(state, token, phone, password) {
            state.hasLogin = true
            state.token = token
            console.log("save token", token)
            uni.setStorage({
                key: 'token',
                data: token
            })
            uni.setStorage({
                key: 'lastLoginData',
                data: {
                    phone,
                    password
                }
            })
        },
        // 登出，清空登录状态，同时清空用户信息
        logout(state) {
            state.hasLogin = false
            state.token = ''
            console.log("退出登录");
            this.commit("clearUserInfo")
            uni.removeStorage({
                key: 'token'
            })
        },
        // 保存用户信息
        saveUserInfo(state, userInfo) {
            state.userInfo = userInfo
            console.log("save userInfo", userInfo)
            uni.setStorage({
                key: 'userInfo',
                data: userInfo
            })
            uni.setStorage({
                key: 'lastLoginData',
                data: {
                    phone: userInfo.phone,
                    password: userInfo.password
                }
            })
        },
        // 清空用户信息
        clearUserInfo(state) {
            state.userInfo = {}
            uni.removeStorage({
                key: 'userInfo'
            })
        },
        // 清空之前的登录信息
        clearLastLoginData(state) {
            console.log("清除上次登录信息");
            uni.removeStorage({
                key: 'lastLoginData',
                success(res) {
                    console.log("succeed", res);
                },
                fail(err) {
                    console.log("fail", err);
                }
            })
        },
        // 删除某条搜索历史
        deleteASearchHistroy(state, index) {
            state.searchHistroy.splice(index, 1);
            uni.setStorage({
                key: "searchHistroy",
                data: state.searchHistroy
            });
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
