// 可迭代协议
// {
//     [Symbol.iterator]: function(){
//         return 迭代器
//     }
// }
// es6规定，一个对象满足了这个条件就是可迭代对象

Object.prototype[Symbol.iterator] = function () {
    return Object.values(this)[Symbol.iterator]();
}
//让下面的代码成立
var [a, b] = { a: 1, b: 2 }

/**
 * 字节面试题
 * 判断传入的函数是否标记了async
 */
function isAsyncFunction(func) {
    return func[Symbol.toStringTag] === 'AsyncFunction';
    // return Object.prototype.toString.call(func) === '[object AsyncFunction'
}

/**
 * 判断一个值是否是Promise Like
 */
function isPromiseLike(value) {
    return (value !== null && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function')
}

function arrange(taskId){
    const tasks = [];
    tasks.push(() => {
        console.log(`${taskId} is notified`);
    })
    async function execute(){
        for(const t of tasks){
            await t();
        }
    }
    function doSomething(something){
        tasks.push(() => {
            console.log(`Start to ${something}`);
        })
        return this;
    }
    function wait(duration){
        tasks.push(() => new Promise(resolve => {
            setTimeout(resolve, duration * 1000);
        }))
        return this;
    }
    function waitFirst(duration){
        tasks.unshift(() => new Promise(resolve => {
            setTimeout(resolve, duration * 1000);
        }))
        return this;
    }
    return {
        execute,
        do: doSomething,
        wait,
        waitFirst
    }
}
arrange("tom")