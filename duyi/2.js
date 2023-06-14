// 防抖函数
function debounce(fn, delay) {
  var timerId;
  return function() {
    clearTimeout(timerId);
    timerId = setTimeout(fn, delay);
  };
}

// 无法取消的默认行为
window.addEventListener("wheel", wheelHandler, {
  passive: true // 默认为true,像鼠标滚动这类比较耗时的事件,默认不会阻止默认行为,设置为false,可以阻止默认行为
});
function wheelHandler(e) {
  e.preventDefault();
}

// 监听元素重叠
var loading = document.querySelector(".loading");
// 建立观察者
var ob = new IntersectionObserver(
  function(entries) {
    // entries： 重叠的元素数组
    var entry = entries[0];
    if (entry.isIntersecting) {
      // isIntersecting：true表示进入,false表示离开
      console.log("加载更多");
    }
  },
  {
    root: null, //观察跟哪个元素重叠(为null或不传为可视窗口)
    thresholds: 0.1 //(0到1)
  }
);
//观察
ob.observe(loading);

// 失活页面的计时器问题
// visibilitychange:页面可见性发生变化的时候触发这个事件
document.addEventListener("visibilitychange", function() {
  console.log(document.visibilityState); //'hidden':页面隐藏 'visible':页面显示
});
//浏览器切换页面的时候,计时器的时间间隔小于1秒的会被重置为1秒(谷歌浏览器是1秒,不同浏览器重置的时间不一样)

// dom获取鼠标位置
dom.addEventListener("click", function(e) {
  // e.x === e.clientX 鼠标到视口左侧的距离
  // e.pageX 鼠标到页面左侧的距离
  // e.screenX 鼠标到屏幕左侧的距离
  // e.movementX 鼠标到上一次位置的横向距离
  // e.offsetX 鼠标到目标元素(e.target)左侧的距离
});

// 过渡结束事件多次触发的问题
// 注意： 每个过渡动画结束后都会触发 transitionend事件
dom.addEventListener(
  "transitionend",
  () => {
    console.log("过渡结束了");
  },
  {
    once: true  //true表示 过渡结束事件只会触发一次
  }
);

// 鼠标和键盘事件的常见问题
dom.onmousedown = function(e){
  console.log("鼠标按下事件")
}
dom.onmouseup = function(e){
  console.log("鼠标抬起事件，一般注册在window上面，因为如果注册在dom上，按下鼠标移出dom后抬起鼠标，不会触发事件")
}
window.onkeydown = function(e){
  console.log("键盘按住不放，键盘按下事件会一直触发，可以用Set变量保存状态，判断是否需要一直触发事件")
}
window.onkeyup = function(e){
  console.log("鼠标抬起事件")
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
