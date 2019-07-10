<script>
export default {
    onLaunch: function() {
        console.log('App Launch')
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    }
}
</script>

<style lang="scss">
/*每个页面公共css */
page,
body {
    background-color: $uni-bg-color-grey;
    font-family: Helvetica Neue, Helvetica, sans-serif;
    font-size: $uni-font-size-base;
    color: $uni-text-color;
}

view,
scroll-view,
swiper,
button,
input,
textarea,
label,
navigator,
image {
    box-sizing: border-box;
}

image {
    max-width: 100%;
    display: inline-block;
    position: relative;
    z-index: 0;
}

switch,
checkbox,
radio {
    position: relative;
}

.response {
    width: 100%;
}

[class*='m_flex'] {
    display: flex;
}
.m_flex_wrap {
    flex-wrap: wrap;
}
.m_flex_v {
    flex-direction: column;
}
.m_flex_center {
    justify-content: center;
}
.m_flex_right {
    justify-content: flex-end;
}
.m_flex_middle {
    align-items: center;
}
.m_flex_bottom {
    align-items: flex-end;
}
.m_item {
    flex: 1;
}
.m_btn {
    background-color: #39b54a;
    color: #ffffff;
}
</style>
