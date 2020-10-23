<template>
    <view class="m_content">
        <view class="bd">
            <block v-if="userInfo && userInfo.avatar">
                <image :src="userInfo.avatar" class="avatar"></image>
                <view class="name">{{userInfo.name}}</view>
            </block>
            <block v-else>
                <button class="m_btn" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" lang="zh_CN">登录</button>
            </block>
        </view>
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
                    '/api/wx/signup',
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

<style lang="scss" scoped>
.bd {
    padding: 100upx;
    text-align: center;

    .avatar {
        width: 120upx;
        height: 120upx;
        border-radius: 50%;
    }

    .name {
        margin-top: 20upx;
        line-height: 40upx;
    }
}
</style>
