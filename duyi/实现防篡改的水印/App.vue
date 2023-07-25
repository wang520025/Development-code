<template>
    <div class="container">
        <Watermark text="版权所有">
            <div class="content">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores fuga, aut dolores a vero eaque corrupti magnam officiis ut ipsum beatae, consectetur mollitia quaerat. Ad a mollitia suscipit similique exercitationem.
            </div>
        </Watermark>
        <Watermark text="禁止转载">
            <video controls class="video" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-02.mp4"></video>
        </Watermark>
    </div>
</template>

<script>
import Watermark from './Watermark.vue'

export default {
    components: {
        Watermark
    },
    data() {
        return {
            
        };
    },
    methods: {
     
    },
};
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
}
.video{
    width: 100%;
    height: 100%;
}
</style>
