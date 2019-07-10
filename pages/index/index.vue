<template>
    <view class="m_content">
        <view class="album_list m_flex_wrap">

        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {}
    },
    onLoad() {
        this.$store.dispatch('getProfile').then(() => {})
        // this.getProfile()
    },
    methods: {
        toCreate() {}
    }
}
</script>

<style lang="scss">
</style>
