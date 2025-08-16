/**
 * 实现节流
 */
function throttle2(fn, interval) {
    let timer = null

    return function (...args) {
        if (timer) return

        timer = setTimeout(() => {
            fn.call(...args)
            timer = null
        }, interval);
    }
}


function throttle(fn, wait) {
    // 时间戳实现节流
    // 核心：获取当前时间戳，只有和闭包的时间戳diff>=wait时，才执行函数并更新闭包时间戳
    let timestamp = Date.now() // ms单位

    return (...args) => {
        console.log('called')
        if (Date.now() - timestamp < wait) return

        fn.call(this, ...args)
        timestamp = Date.now()
    }
}



function sayHi() {
    console.log(' hello ' + new Date().getSeconds())
}
const throttledHi = throttle(sayHi, 1000)

// 每隔 10 ms 调用一次， 持续 5s 结束
// 因为有节流处理，所以应该只调用5次
let timer = setInterval(() => {
    throttledHi()
}, 10);

setTimeout(() => {
    clearInterval(timer)
}, 5000);