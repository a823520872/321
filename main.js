import Vue from 'vue'
import App from './App'
import store from './store'
import ajax from './common/ajax'
import Methods from './common/methods.js'

Vue.config.productionTip = false

Object.keys(Methods).map(method => {
    Vue.prototype[`$${method}`] = Methods[method]
})

Vue.prototype.$store = store
Vue.prototype.$ajax = ajax

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
