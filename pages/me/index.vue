<template>
    <view class="m_content">
        <block v-if="userInfo && userInfo.avatar">
            <image :src="userInfo.avatar" class="avatar"></image>
            <view class="name">{{userInfo.name}}</view>
        </block>
        <block v-else>
            <button class="m_btn" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" lang="zh_CN">登录</button>
        </block>
    </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState(['userInfo'])
    },
    data() {
        return {}
    },
    onLoad() {
        this.getProfile()
    },
    methods: {
        ...mapActions(['getProfile']),
        getUserInfo(e) {
            const { errMsg, encryptedData, iv } = e.detail
            if (errMsg === 'getUserInfo:ok') {
                this.$ajax(
                    '/api/wx/signUp',
                    {
                        encryptedData,
                        iv
                    },
                    { type: 'post' }
                ).then(res => {
                    this.getProfile(true)
                })
            }
        }
    }
}
</script>

<style lang="scss">
</style>
