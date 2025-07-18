/**
 * 实现防抖函数 debouce
 * 防抖是指，针对频繁triiger的函数，trigger暂停之后短暂时间再执行
 * 采用定时器来做delaycall
 */
function debouce(fn, delay) {
    let timer = null
    return function (...args) {
        if (timer) { clearTimeout(timer) }
        timer = setTimeout(() => {
            fn.call(this, args)
        }, delay);

    }
}

function say(id) {
    console.log('call me ', id, ' ', new Date().getSeconds())
}
const debounced = debouce(say, 1000)
console.log('start ', new Date().getSeconds())
debounced(1)
debounced(2)
debounced(3)
debounced(4)
debounced(5)
debounced(6)
debounced(7)
debounced(8)
debounced(9)
// 只触发最后一次