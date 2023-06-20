// 1——xhr
export function request(options = {}){
    const { url, method = 'GET', onProgress, data = null } = options;
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if(xhr.readyState === xhr.DONE){
                resolve(xhr.responseText)
            }
        })
        xhr.addEventListener('progress', (e) => {
            onProgress && onProgress({
                loaded: e.loaded,
                total: e.total
            })
            console.log(e.loaded, e.total)
        })
        xhr.upload.addEventListener('progress', (e) => {
            // 这里是请求进度
            console.log(e.loaded, e.total)
        })
        xhr.open(method, url);
        xhr.send(data)
    })
}

// 2——fetch
export function request(options = {}){
    const { url, method = 'GET', onProgress, data = null } = options;
    return new Promise(async(resolve) => {
        const resp = await fetch(url, {
            method,
            body: data
        })
        const total = +resp.headers.get('content-length');
        const decoder = new TextDecoder();
        let body = '';
        const reader = resp.body.getReader();
        let loaded = 0;
        while(1){
            const {done, value} =await reader.read();
            if(done){
                break;
            }
            loaded += value.length;
            body +=decoder.decode(value)
            onProgress && onProgress({
                loaded,
                total
            })
        }
        // const body = await resp.text();
        resolve(body)
    })
}