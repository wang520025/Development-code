// vue源码中的一个函数
/**
 * 从x 到 y, 数据是否发生了变化
 */
export function hasChanged(x, y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y;
    // 排除 +0 -0
  } else {
    return x === x || y === y;
    // 排除NaN NaN
  }
}

// 利用自定义ref实现防抖
import { customRef } from 'vue';
function debounceRef(valur, delay = 1000) {
  let timer;
  return customRef((track, trigger) => {
    return {
      get() {
        //依赖收集track()
        track();
        return value
      },
      set(val) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          // 派发更新trigger()
          value = val;
          trigger()
        }, delay)
      }
    }
  })
}
const text = debounceRef('')

// 自动注入Less全局变量(vue.config.js)
const {defineConfig} = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions:{
      less:{
        additionalData: '@import url("~@/var.less")'
      }
    }
  }
})