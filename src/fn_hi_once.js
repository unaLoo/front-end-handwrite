/**
 * 实现Once函数，使一个函数只会被执行一次
 */

function once(fn) {
    let called = false
    return function (...args) {
        fn.call()
    }
}