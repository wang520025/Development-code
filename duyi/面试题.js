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