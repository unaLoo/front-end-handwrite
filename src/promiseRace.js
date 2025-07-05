/**
 * 实现Promise.race()方法，一旦有一个Promise状态settled就返回结果
 */

function thePromiseRace(arr) {
    return new Promise((resolve, reject) => {
        for (let item of arr) {
            item.then(resolve, reject)
        }
    })
}

const a = new Promise((res, rej) => {
    setTimeout(() => {
        res('hello')
    }, 1001);
})
const b = new Promise((res, rej) => {
    setTimeout(() => {
        res('wonderful')
    }, 1000);
})
const c = new Promise((res, rej) => {
    setTimeout(() => {
        res('wonderful')
    }, 1002);
})

thePromiseRace([a, b, c]).then(res => {
    console.log(res)
})
