// 统计下面字符串中每个字符出现的频率
var str = 'asdadasqeqfhggf'

// var result = {}
// for(var i = 0; i< str.length; i++){
//     if(result[str[i]]){
//         result[str[i]]++
//     }else{
//         result[str[i]] = 1
//     }
// }
// console.log(result)

var result = str.split('').reduce((a, b) => (a[b]++ || (a[b] = 1), a), {})
console.log(result)