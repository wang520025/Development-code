// never类型的妙用1
type Method = 'GET' | 'POST'
function request(method:Method, url:string){
    switch(method){
        case 'GET':
            return 'qeqweqeqw';
        case 'POST':
            return 'qeqweqeqw';
        default:
            const n:never = method;
            return n
    }
}

// never类型的妙用2
// x 可以是任何类型,但不能是日期
type BanDate<T, E> = T extends E ? never : T
function log<T>(x: BanDate<T, Date>){
    console.log(x)
}
// log(new Date())

//@ts-ignore   ——跳过ts的类型校验