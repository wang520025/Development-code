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

// 中断和恢复任务序列
/**
 * 依次顺序执行一系列任务
 * 所有任务全部完成后可以得到每个任务的执行结果
 * 需要返回两个方法，start用于启动任务，pause用于暂停任务
 * 每个任务具有原子性，即不可中断，只能在两个任务之间中断
 * @param {...Function} tasks 任务列表，每个任务无参、异步
 */
function processTasks(...tasks) {
    let isRunning = false;
    let i = 0; // 当前任务执行的下标
    const result = []; // 接受每个任务的执行结果
    let prom = null;
    return {
        start() {
            return new Promise(async (resolve, reject) => {
                if(prom){
                    // 结束了
                    prom.then(resolve, reject);
                    return;
                }
                if(isRunning){
                    return;
                }
                isRunning = true;
                while (i < tasks.length) {
                    try{
                        console.log(i, "执行中");
                        result.push(await tasks[i]());
                        console.log(i, "执行完成");
                    }catch(err){
                        isRunning = false;
                        reject(err)
                        prom = Promise.reject(err)
                        return
                    }
                    i++;
                    if (!isRunning && i < tasks.length - 1) {
                        console.log("执行被中断")
                        // 中断
                        return;
                    }
                }
                // 成功
                isRunning = false;
                resolve(result);
                prom = Promise.resolve(result)
            })
        },
        pause() {
            isRunning = false
        }
    }
}
const tasks = [];
for(let i = 0; i < 5; i++){
    tasks.push(() => new Promise((resolve) => {
        setTimeout(() => {
            resolve(i);
        }, 2000);
    }))
}
const processor = processTasks(...tasks);
beginDom.onclick = async() => {
    console.log('点击开始');
    const results = await processor.start();
    console.log('任务执行完成', results);
}
pauseDom.onclick = () => {
    console.log('点击暂停');
    processor.pause();
}

// 并发任务控制
function timeout(time){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}
class SuperTask{
    constructor(parallelCount = 2){
        this.parallelCount = parallelCount; // 并发数量
        this.runningCount = 0; // 正在运行的任务数
        this.tasks = [];
    }
    add(task){
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task,
                resolve,
                reject
            });
            this._run();
        })
    }

    // 依次运行tasks队列的所有任务
    _run(){
        while(this.runningCount < this.parallelCount && this.tasks.length){
            const {task ,resolve, reject} = this.tasks.shift();
            this.runningCount++;
            task().then(resolve, reject).finally(() => {
                this.runningCount--;
                this._run();
            })
        }
    }
}

const superTask = new SuperTask();
function addTask(time, name){
    superTask.add(() => timeout(time))
    .then(() => {
        console.log(`任务${name}完成`);
    })
}
addTask(10000, 1);  // 10000ms后输出：任务1完成
addTask(5000, 2);   // 5000ms后输出：任务2完成
addTask(3000, 3);   // 8000ms后输出：任务3完成
addTask(4000, 4);   // 12000ms后输出：任务4完成
addTask(5000, 5);   // 15000ms后输出：任务5完成