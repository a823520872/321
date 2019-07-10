export default {
    goPage(url) {
        if (!url) return
        if (url.indexOf('://') === -1) {
            const tabs = ['/pages/index/index', '/pages/me/index']
            const isTab = tabs.some(path => ~url.indexOf(path))
            isTab
                ? uni.switchTab({
                      url
                  })
                : uni.navigateTo({
                      url
                  })
        } else {
            uni.navigateTo({
                url: `/pages/me/webview?src=${encodeURIComponent(url)}`
            })
        }
    }
}
