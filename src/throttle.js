/**
 * 实现节流
 */
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

function throttle2(fn, wait) {
    // 定时器实现节流
    // 核心：从不取消定时器，只在计时完毕标记timer=null，下次重新计时
    let timer = null
    return (...args) => {
        if (timer) return

        timer = setTimeout(() => {
            fn.call(this, ...args)
            timer = null
        }, wait);
    }
}

function debouce(fn, delay) {
    // 定时器实现的防抖
    // 核心：取消定时器，重新计时
    let timer = null
    return (...args) => {
        if (timer) clearInterval(timer)
        timer = setTimeout(() => {
            fn.call(this, ...args)
        }, delay);
    }
}


function sayHi() {
    console.log(' hello ' + Date.now())
}
const throttledHi = throttle2(sayHi, 1000)
const debouceHi = debouce(sayHi, 1000)

let timer = setInterval(() => {
    throttledHi()
    // debouceHi()
}, 100);

setTimeout(() => {
    clearInterval(timer)
}, 5000);