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


// Axios在返回status是多少时，调用then方法?在defaults.js文件中找到了答案
//        validateStatus: function validateStatus(status) {
//           return status >= 200 && status < 300;
//        }
// 也就是说在我们没有设置adapter的validateStatus方法的时候，status在200到300之间会调用then方法，或者准确点说叫resolve方法，通过公司项目的实践，亲测成功。

// vuex注意：
//      // 状态, 全局挂载（main.js)
//     Vue.prototype.$store = store;
// vue项目根目录，@/表示：src/
// vue无法加载文件C:\Users\Administrator\AppData\Roaming\npm\vue.ps1因为在此系统上禁止运行脚本……解决办法?
//   1)管理员身份运行PowerShell（命令提示符，来源于Linux的命令提示符也叫Shell）
//   2)执行：set-ExecutionPolicy RemoteSigned （签名或运行这些脚本）