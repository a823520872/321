<template>
    <view class="m_content">
        <view class="photo_list m_flex_wrap">
            <view class="item" v-for="(li, i) in album.photos" :key="i" @tap="viewPhoto(li)">
                <view class="box">
                    <image :src="li" mode="aspectFill"></image>
                </view>
            </view>
        </view>
        <view class="fd">
            <button class="m_btn" @tap="handleClick">编辑</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            albm_id: '',
            album: null
        }
    },
    onLoad(res) {
        this.albm_id = res.id
    },
    onReady() {
        if (this.albm_id) {
            this.getData()
        }
    },
    methods: {
        getData() {
            this.$ajax(`/api/album/${this.albm_id}`).then(res => {
                this.album = res.data
            })
        },
        viewPhoto(li) {
            uni.previewImage({
                current: li,
                urls: this.album.photos
            })
        },
        handleClick() {
            this.$goPage(`/pages/index/album?id=${this.albm_id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.photo_list {
    padding: 24upx 20upx;

    .item {
        margin: 0 10upx 24upx;
    }

    .box {
        position: relative;
        width: 157upx;
        height: 157upx;
        border: 1upx solid $uni-border-color;
        border-radius: 12upx;
        overflow: hidden;
    }
    .last {
        .box {
            &::before,
            &::after {
                content: ' ';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 4upx;
            }

            &::before {
                width: 60%;
                height: 0;
                border-bottom: 8upx solid $uni-border-color;
            }

            &::after {
                width: 0;
                height: 60%;
                border-left: 8upx solid $uni-border-color;
            }
        }
    }
}
.fd {
    padding: 24upx 30upx;
}
</style>
