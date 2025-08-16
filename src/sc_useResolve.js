/**
 *
 * 实现b函数，使得b.then中可以打印cb的参数值 
 * 核心是resolve的传递，把resolve闭包存起来，是个重要的实践
 */

const a = (cb) => {
    setTimeout(() => {
        cb('hello ' + Math.random())
    }, 1000);
}

const b = () => {
    // 实现代码
    return new Promise((resolve) => {
        a(resolve)
    })
}

b().then(res => {
    console.log(res);
})