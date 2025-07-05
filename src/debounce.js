/**
 * 实现防抖函数 debouce
 * 防抖是指，针对频繁triiger的函数，trigger暂停之后短暂时间再执行
 * 采用定时器来做delaycall
 */
function debouce(fn, delay) {
    let timer = null
    return (...args) => {
        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            fn(...args)
        }, delay);
    }
}

function add(a, b) {
    console.log('call me ', Date.now() * 1000)
    return a + b
}
const debouncedAdd = debouce(add, 1000)
console.log('start ', Date.now() * 1000)
debouncedAdd(1, 2)