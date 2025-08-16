/**
 * 用settimeout实现setInterval
 */

function mySetInterval(fn, time) {

    let stop = false

    const excute = () => {
        if (stop) return
        fn()
        setTimeout(excute, time);
    }

    setTimeout(excute, time)

    return () => stop = true
}

const stop = mySetInterval(() => {
    console.log(Date.now())
}, 1000)

setTimeout(() => {
    stop()
}, 5500);