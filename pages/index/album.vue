<template>
    <view class="m_content">
        <form @submit="formSubmit" @reset="formReset">
            <view class="section m_flex_middle">
                <view class="section__title">相册名</view>
                <input class="m_item" name="name" type="text" v-model="album.name" placeholder="请输入相册名" />
            </view>
            <view class="section m_flex_middle">
                <view class="section__title">是否公开</view>
                <switch class="m_item" name="privated" v-model="album.privated" @change="album.privated = !album.privated" />
            </view>
            <view class="section m_flex_middle">
                <view class="section__title">图片</view>
            </view>
            <view class="photo_list m_flex_wrap">
                <view class="item" v-for="(li, i) in album.photos" :key="i" @tap="toPhoto(li)">
                    <view class="box">
                        <image :src="li.path" mode="aspectFill"></image>
                    </view>
                </view>
                <view class="item last" @tap="addPhoto">
                    <view class="box"></view>
                </view>
            </view>
            <view class="fd">
                <button formType="submit" class="m_btn">确定</button>
            </view>
            <!-- <view class="btn-area">
                <button formType="submit" class="m_btn">确定</button>
            </view> -->
        </form>
    </view>
</template>

<script>
export default {
    data() {
        return {
            albm_id: '',
            album: {
                name: '',
                privated: false,
                photos: []
            }
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
                res.data.photos = res.data.photos.map(photo => ({
                    path: photo,
                    uploaded: true
                }))
                this.album = res.data
            })
        },
        uploadPhoto(photo) {
            return new Promise((resolve, reject) => {
                if (photo.uploaded) {
                    resolve(photo.path)
                } else {
                    this.$ajax('/api/photo/upload', {filePath: photo.path}, {upload: true}).then(res => {
                        if (res.data) {
                            resolve(res.data)
                        }
                    })
                }
            })
        },
        formSubmit() {
            this.validate().then(() => {
                const photos = this.album.photos
                Promise.all(photos.map(photo => this.uploadPhoto(photo)))
                    .then(photos => {
                        console.log(photos);
                        console.log({ ...this.album, photos });
                        let url = this.albm_id ? '/api/album/update': '/api/album'
                        return this.$ajax(url, { ...this.album, photos }, { type: 'POST' })
                    })
                    .then(
                        res => {
                            if (this.albm_id) {
                                uni.showToast({
                                    title: '创建成果',
                                    icon: 'success'
                                })
                            }
                            this.$back()
                        },
                        e => {
                            console.log(e)
                            uni.showToast({
                                icon: 'none',
                                title: e.toString()
                            })
                        }
                    )
            })
        },
        addPhoto() {
            this.$upload().then(res => {
                if (res.errMsg === 'chooseImage:ok') {
                    this.album.photos.push(...res.tempFilePaths.map(li => ({path: li, uploaded: false})))
                }
            })
        },
        validate() {
            return new Promise((resolve, reject) => {
                if (!this.album.name) {
                    reject()
                }
                resolve()
            })
        },
        formReset() {}
    }
}
</script>

<style lang="scss" scoped>
.section {
    padding: 24upx 30upx;
    font-size: 28upx;

    &__title {
        flex: 0 0 120upx;
        margin-right: 20upx;
    }
}
.btn-area {
    padding: 24upx 30upx;
}
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

