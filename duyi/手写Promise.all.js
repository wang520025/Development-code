// 手写Promise.all

Promise.myAll = function (proms) {
    let res, rej;
    const p = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    });
    // 设置p的状态
    const result = [];
    let count = 0; //数量
    let fulFilledCount = 0; // 完成的数量
    for (const prom of proms) {
        const i = count;
        count++;
        Promise.resolve(prom).then((data) => {
            // 将成功的数据汇总到 result
            result[i] = data;
            //  判断是不是全部完成
            fulFilledCount++;
            if (fulFilledCount === count) {
                res(result);
            }
        }, rej);
    }
    if (count === 0) {
        res(result);
    }
    return p;
};

// Promise.myAll([1, 2, 3]).then((datas) => {
//     console.log(datas);
// });

Promise.resolve().then(() => {
    console.log(0)
    return Promise.resolve(4)
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1)
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(5)
}).then(() => {
    console.log(6)
})

async function asy1(){
    console.log(1);
    await asy2();
    console.log(2);
}
asy2 = async () => {
    // 第一组
    // await setTimeout((_) => {
    //     Promise.resolve().then((_) => {
    //         console.log(3)
    //     })
    //     console.log(4)
    // }, 0)
    // 第二组
    await (async () => {
        await (() => {
            console.log(3);
        })();
        console.log(4);
    })();
    // 第三组
    await (async () => {
        Promise.resolve().then((_) => {
            console.log(3);
        });
        console.log(4);
    })();
    // 第四组
    await Promise.resolve().then((_) => {
        Promise.resolve().then((_) => {
            console.log(3);
        })
        console.log(4);
    })
    console.log(5);
};
asy3 = async () => {
    Promise.resolve().then((_) => {
        console.log(6)
    })
}
asy1()
console.log(7);
asy3()