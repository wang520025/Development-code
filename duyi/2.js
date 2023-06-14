// 防抖函数
function debounce(fn, delay) {
  var timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(fn, delay);
  };
}

// 函数签名
// 函数名  参数列表  返回值
/**
 * 判断一个数是不是素数
 * @param {Number} n 待判断的数
 * @return {Boolean} 判断的结果
 */
function isPrime(n) {

}

// 函数二义性
function fn() {
  if (new.target) {
    throw new Error("can't invoke with 'new'")
    // 如果new.target为true，表示函数通过new关键字调用的
  }
}
fn()  // 普通函数调用
new fn() // 构造函数调用