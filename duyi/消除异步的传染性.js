async function getUser(){
    return await fetch('https://my-json-server.typicode.com/typicode/demo/profile').then((resp) => resp.json());
}

async function m1(){
    //other works
    return await getUser();
}

async function m2(){
    //other works
    return await m1();
}

async function m3(){
    //other works
    return await m2();
}

async function main() {
    const user = await m3();
    console.log(user);
}

function run (func){
    let cache = [];
    let i = 0;
    const _originalFetch = window.fetch;
    window.fetch = (...args) => {
        if(cache[i]){
            if(cache[i].status === 'fulfilled'){
                return cache[i].data;
            }else if(cache[i].status === 'rejected'){
                throw cache[i].err
            }
        }
        const result = {
            status: 'pending',
            data: null,
            err: null
        }
        cache[i++] = result;
        // 发送请求
        const prom = _originalFetch(...args).then(resp => resp.json()).then(resp => {
            result.status = 'fulfilled';
            result.data = resp;
        }, err => {
            result.status = 'rejected';
            result.err = err;
        })
        // 报错
        throw prom
    }
    try{
        func()
    }catch(err){
        // 什么时候引发重新执行func
        if(err instanceof Promise){
            const reRun = () => {
                i = 0;
                func()
            }
            err.then(reRun,reRun)
        }
    }
}

run(main)