/**
 * 实现 promise
 */
const STATE = {
    pending: 'pending',
    fullfilled: 'fulfilled',
    rejected: 'rejected'
}

function ThePromise(executor) {

    this.state = STATE.pending
    this.value = null
    this.callbacks = []

    const resolve = (val) => {
        if (this.state !== STATE.pending) return
        this.value = val
        this.state = STATE.fullfilled
        // 模拟异步执行
        setTimeout(() => {
            for (let cb of this.callbacks) {
                cb.onFulfilled && cb.onFulfilled(this.value)
            }
        });
    }
    const reject = (val) => {
        if (this.state !== STATE.pending) return
        this.value = val
        this.state = STATE.rejected
        console.warn(val)
        // 模拟异步执行
        setTimeout(() => {
            for (let cb of this.callbacks) {
                cb.onRejected && cb.onRejected(this.value)
            }
        });
    }
    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

// 链式调用的核心！返回一个新的Promise
ThePromise.prototype.then = function (onFulfilled, onRejected) {

    const self = this //当前 promise

    return new ThePromise((resolve, reject) => {

        function handle(callback) {
            setTimeout(() => {
                try {
                    const res = callback(self.value)
                    if (res instanceof ThePromise) {
                        // 处理then中的异步
                        res.then(
                            val => { resolve(val) },
                            e => { reject(e) }
                        )
                    } else {
                        // 处理then中的同步
                        resolve(res)
                    }
                } catch (e) {
                    reject(e)
                }
            });
        }

        if (this.state === STATE.pending) {
            // 核心：不能立即处理onFulfilled和onRejected
            // 包一层这样才能处理异步情况
            this.callbacks.push({
                onFulfilled: () => handle(onFulfilled),
                onRejected: () => handle(onRejected)
            })
        }
        else if (this.state === STATE.fullfilled) {

            handle(onFulfilled)
        }
        else if (this.state === STATE.rejected) {

            handle(onRejected)
        }
    })
}
ThePromise.prototype.catch = function (fn) {
    this.then(null, fn)
}


// test
let p = new ThePromise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello ');
    }, 500);
}).then(res => {
    console.log(res);  // hello
}).then(_ => {
    return new ThePromise((resolve, reject) => {
        setTimeout(() => {
            resolve('world')
        }, 1000);
    })
}).then(val => {
    console.log(val)
})
