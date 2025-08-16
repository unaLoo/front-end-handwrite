/**
 * 在不适用await/async的情况下实现Promise.all()
 * 思路：采用计数（finished）实现 
 */

function promiseAll(arr) {

    return new Promise((resolve, reject) => {
        try {
            const result = new Array(arr.length)
            let finished = 0

            const process = (id, res) => {
                result[id] = res
                if (++finished === result.length) {
                    console.log(1)
                    resolve(result)
                }
            }

            for (let index = 0; index < arr.length; index++) {
                let item = arr[index]
                if (item instanceof Promise) {
                    item.then((res) => {
                        process(index, res)
                    })
                } else {
                    process(index, item)
                }
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

const a = Promise.resolve('hello')
const b = new Promise((res, rej) => {
    setTimeout(() => {
        res('wonderful')
    }, 3000);
})
const c = 'world'
promiseAll([a, b, c]).then(res => {
    console.log(res)
})
