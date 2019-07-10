import store from '../store'

const Ajax = (path, params, options = {}) => {
    const urlPrefix = 'http://localhost:3000'
    const header = {
        'content-type': 'application/json'
    }
    let token = uni.getStorageSync('token')
    let url = urlPrefix + path
    options = { ...{ type: 'get' }, ...options }
    if (token) {
        header.token = token
    }
    return new Promise((resolve, reject) => {
        uni.request({
            url,
            header,
            method: options.type,
            data: params,
            success: res => {
                let { data, statusCode } = res
                if (statusCode === 200) {
                    if (data.code === 1) {
                        resolve(data)
                    } else {
                        if (data.msg === '请先登录') {
                            uni.clearStorageSync('token')
                            store
                                .dispatch('login')
                                .then(() => {
                                    return Ajax(path, params, options)
                                })
                                .then(data => {
                                    resolve(data)
                                }, reject)
                        } else {
                            reject(data)
                        }
                    }
                } else {
                    reject(data)
                }
            },
            fail: reject
        })
    })
}

export default Ajax
