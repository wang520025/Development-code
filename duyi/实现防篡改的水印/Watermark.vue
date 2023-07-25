t<template>
    <div class="watermark-container" ref="parentRef">
        <slot></slot>
        <!-- 添加一个div，填充满整个区域，设置水印背景，重复 -->
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true,
            default: 'watermark',
        },
        fontSize: {
            type: Number,
            default: 40,
        },
        gap: {
            type: Number,
            default: 20,
        },
    },
    data() {
        return {
            ob: undefined,
            div: null,
            flag: 0,
        };
    },
    watch: {
        flag(newValue) {
            this.init();
        },
    },
    mounted() {
        this.init();

        this.ob = new MutationObserver(records => {
            for (const record of records) {
                // 删除水印
                for (const dom of record.removedNodes) {
                    if (dom === this.div) {
                        // 有删除操作
                        this.flag++;
                        return;
                    }
                }
                // 修改
                if (record.target === this.div) {
                    this.flag++;
                    return;
                }
            }
        });
        this.ob.observe(this.$refs.parentRef, {
            childList: true,
            attributes: true,
            subtree: true,
        });
    },
    beforeDestroy() {
        this.ob.disconnect();
        this.div = null;
    },
    methods: {
        useWatermarkBg(props) {
            const canvas = document.createElement('canvas');
            const devicePixelRatio = window.devicePixelRatio || 1;
            const fontSize = props.fontSize * devicePixelRatio;
            const font = fontSize + 'px serif';
            const ctx = canvas.getContext('2d');
            // 获取文字宽度
            ctx.font = font;
            const { width } = ctx.measureText(props.text);
            const canvasSize =
                Math.max(100, width) + props.gap * devicePixelRatio;
            canvas.width = canvasSize;
            canvas.height = canvasSize;
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((Math.PI / 180) * -45);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.font = font;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(props.text, 0, 0);
            return {
                base64: canvas.toDataURL(),
                size: canvasSize,
                styleSize: canvasSize / devicePixelRatio,
            };
        },
        init() {
            if (!this.$refs.parentRef) return;
            if (this.div) {
                this.div.remove();
            }
            const { base64, styleSize } = this.useWatermarkBg(this._props);
            this.div = document.createElement('div');
            this.div.style.backgroundImage = `url(${base64})`;
            this.div.style.backgroundSize = `${styleSize}px ${styleSize}px`;
            this.div.style.backgroundRepeat = 'repeat';
            this.div.style.zIndex = 9999;
            this.div.style.position = 'absolute';
            this.div.style.inset = 0;
            this.$refs.parentRef.appendChild(this.div);
        },
    },
};
</script>

<style lang="less" scoped>
.watermark-container {
    position: relative;
}
</style>
