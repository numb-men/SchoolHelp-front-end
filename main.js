import Vue from 'vue'
import App from './App'

import api from 'api/api.js'
import store from './store'
import utils from 'common/util.js'

Vue.config.productionTip = false

Vue.prototype.$store = store

// 挂载api模块
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
