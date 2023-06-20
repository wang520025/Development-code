// 并发请求
// @param {string[]} urls 待请求的 url 数组
// @param {number} maxNum 最大并发数

function concurRequest(urls, maxNum) {
    return new Promise(resolve => {
        if (urls.length === 0) {
            resolve([])
            return
        }
        const results = [];
        let index = 0; // 下一个请求的下标
        let count = 0; // 当前请求完成的数量
        // 发送请求
        async function request() {
            if (index === urls.length) {
                return
            }
            const i = index;
            const url = urls[index];
            index++;
            try {
                const resp = await fetch(url);
                // resp加入到results
                results[i] = resp
            } catch (err) {
                // err加入到results
                results[i] = err
            } finally {
                // 判断是否所有的请求都已完成
                count++
                if (count === urls.length) {
                    resolve(results)
                }
                request()
            }
        }
        const times = Math.min(maxNum, urls.length)
        for (let i = 0; i < times; i++) {
            request()
        }
    })
}
const urls = [];
for (let i = 1; i <= 30; i++) {
    urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`)
}
concurRequest(urls, 4).then((resps) => {
    console.log(resps)
})


// 可以重试的请求方法
/**
 * 发出请求,返回Promise
 * @param {string} url 请求地址
 * @param {number} maxCount 最大重试次数
 */
function request(url, maxCount = 5) {
    return fetch(url).catch((err) => maxCount <= 0 ? Promise.reject(err) : request(url, maxCount - 1))
}
request('https://jsonplaceholder.typicode.com/todos', 6).then((resp) => {
    console.log(resp)
}).catch((err) => {
    console.log(err)
})