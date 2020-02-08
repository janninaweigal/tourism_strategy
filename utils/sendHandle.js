// 返回结果形式
export function success(ctx){
    return (data, msg = '请求成功') => {
        ctx.set('Content-Type', 'application/json');
        ctx.body = {
            code: 1,
            data,
            msg
        }
    }
}
export function error(ctx){
    return (msg = '请求失败',code = 0) => {
        ctx.set('Content-Type', 'application/json');
        ctx.body = {
            code,
            data: null,
            msg
        }
    }
}