<template>
    <view class="m_content">
        <web-view :src="src"></web-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            src: ''
        }
    },
    onLoad(res) {
        this.src = decodeURIComponent(res.src)
        if (res.t) {
            uni.setNavigationBarTitle({ title: decodeURIComponent(res.t) })
        }
    }
    // onShareAppMessage() {
    //     let url = '/pages/home/webview?src=' + encodeURIComponent(this.src)
    //     let p = `/pages/index?url=${encodeURIComponent(url)}`
    //     return {
    //         path: p
    //     }
    // }
}
</script>

<style>
</style>
