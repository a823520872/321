import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '../common/ajax'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: false,
    state: {
        userInfo: null
    },
    getters: {},
    mutations: {
        // setVal(state, obj) {
        //     state[obj.key] = obj.val
        // },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {
        login(context) {
            return new Promise((resolve, reject) => {
                uni.checkSession()
                    .then(() => {
                        let token = uni.getStorageSync({ key: 'token' })
                        if (token) {
                            resolve()
                        }
                    })
                    .finally(() => {
                        uni.login().then(res => {
                            let { code } = res[1]
                            ajax('/api/wx/login', { code }).then(res => {
                                if (res && res.data) {
                                    uni.setStorageSync('token', res.data.token)
                                }
                                resolve()
                            }, reject)
                        })
                    })
            })
        },
        getProfile(context, refresh = false) {
            return new Promise((resolve, reject) => {
                if (!refresh && context.state.userInfo) {
                    resolve()
                } else {
                    uni.getStorage({ key: 'token' })
                        .then(token => {
                            if (!token) {
                                return context.dispatch('login')
                            }
                        })
                        .finally(() => {
                            ajax('/api/user/profile').then(res => {
                                if (res && res.data) {
                                    context.commit('setUserInfo', res.data)
                                }
                                resolve()
                            }, reject)
                        })
                }
            })
        }
    }
})

export default store
