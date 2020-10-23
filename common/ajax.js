import store from '../store'

const Ajax = (path, params, options = {}) => {
    const urlPrefix = 'http://localhost:8888' || 'https://api.photo.zhiqiang.ink'
    const header = {
        'content-type': 'application/json'
    }
    let token = uni.getStorageSync('token')
    let url = urlPrefix + path
    let opts = { ...{ type: 'get' }, ...options }
    if (token) {
        header.token = token
    }
    return new Promise((resolve, reject) => {
        const success = res => {
            let { data, statusCode } = res
            if (statusCode === 200) {
                if (typeof data === 'string') {
                    data = JSON.parse(data)
                }
                if (data.code === 1) {
                    resolve(data)
                } else if (data.code === 0) {
                    reject(data)
                } else if (data.code === -1) {
                    uni.clearStorageSync('token')
                    store
                        .dispatch('login')
                        .then(() => {
                            return Ajax(path, params, opts)
                        })
                        .then(resolve, reject)
                }
            } else {
                reject(data)
            }
        }
        if (opts.upload) {
            params.name = 'file'
            uni.uploadFile({
                url,
                header,
                filePath: params.filePath,
                name: params.name,
                success,
                fail: reject
            })
        } else {
            uni.request({
                url,
                header,
                method: opts.type,
                data: params,
                success,
                fail: reject
            })
        }
    })
}

export default Ajax
