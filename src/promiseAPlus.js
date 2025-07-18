/**
 * 按照Promise A+ 规范，实现Promise
 */

// constants
const PENDING = 'pending'
const FULFILLED = 'fullfilled'
const REJECTED = 'rejected'

// 1. resolve 和 reject 改变状态和数据，且状态不可逆  触发任务队列执行
// 2. then 收集任务(包括resolve和reject函数)  触发任务队列执行
// 3. 特殊情况，resolve参数为promise
class Promize {

    constructor(excutor) {

        this._state = PENDING
        this._value = undefined
        this._handles = []

        // 注意this绑定
        this.resolve = this._resolve.bind(this)
        this.reject = this._reject.bind(this)

        // 如果excutor内部报错，那么直接触发reject
        try {
            excutor(this.resolve, this.reject)
        }
        catch (e) {
            this.reject(e)
            console.log(e)
        }
    }

    // 改变状态和数据, Promise状态不可逆
    _resolve(val) {
        this._settleState(FULFILLED, val)

    }

    // 改变状态和数据, Promise状态不可逆
    _reject(val) {
        this._settleState(REJECTED, val)

    }

    // 支撑链式调用，返回新的promise，注册回调函数，不会立即执行
    then(onFulfilled, onRejected) {

        return new Promize((theResolve, theReject) => {

            // 收集任务
            this._pushHandlers(onFulfilled, onRejected, theResolve, theReject)

            // 如果调用then的时候，状态已经确定了，那也会runHandles
            this._runHandlers()
        })
    }




    /////// Helpers //////////////////////////////////
    _settleState(state, val) {
        if (this._state != PENDING) return
        this._state = state
        this._value = val

        // 状态变化后执行handlers
        this._runHandlers()
    }

    // 这里存了resolve和reject，我们才能方便地控制then返回的promise的成功与否
    _pushHandlers(onFulfilled, onRejected, theResolve, theReject) {
        this._handles.push({
            onFulfilled,
            onRejected,
            'resolve': theResolve,
            'reject': theReject
        })
    }

    // 执行handlers, 注意执行过的得删了
    _runHandlers() {
        if (this._state == PENDING) return
        // 队列的遍历处理
        while (this._handles.length) {
            const handler = this._handles.shift()
            this._runOneHandler(handler)
        }
    }

    // 在接受参数时解构，是为了this不指向handler对象
    _runOneHandler({ onFulfilled, onRejected, resolve, reject }) {
        // 在执行时，需要正确处理resovle,reject，这决定了then返回的promise的状态
        runMicroTask(() => {
            // 此时状态已敲定
            const func = this._state == FULFILLED ? onFulfilled : onRejected

            if (typeof func !== 'function') {
                // 无效参数、空参数、没做处理，那么Promise会做状态吸收
                // 这个promise的状态吸收自父Promise的状态
                this._state == FULFILLED ?
                    resolve(this._value) : reject(this._value)
                return
            }

            try {
                // 执行handle，如果有返回值的话拿到，没返回值的话就是undefined
                let res = func(this._value)

                // 一般情况
                if (!isPromize(res)) {
                    resolve(res)
                    return
                }

                // 特殊情况，返回值是promise，在这个promise的then中，用我们的resolve和reject
                res.then((res) => {
                    resolve(res)
                }, (e) => {
                    reject(e)
                })


            } catch (e) {
                reject(e)
                console.log(e)
            }

        })
    }
}

/////// Helper //////////////////////////////////
// 模拟微队列， 可以直接用setTimeout
function runMicroTask(cb) {
    // node 环境 process.nextTick
    if (process && process.nextTick) {
        process.nextTick(() => {
            cb()
        })
    }
    // 浏览器环境 MutationObserver
    else if (MutationObserver) {
        const p = document.createElement('p')
        const observer = new MutationObserver(() => {
            cb()
        })
        observer.observe(p, { childList: true })
        p.innerText = '0'
    }
    else {
        setTimeout(() => {
            cb()
        });
    }
}

function isPromize(obj) {
    // if (obj && typeof obj == 'object' && typeof obj.then == 'function') return true
    // return false
    return !!(obj && typeof obj == 'object' && typeof obj.then == 'function')
}

////////////////////////////////////////////////
// Promise的其它方法

// 1: catch
// catch 就是 then 不传第一个参数
Promize.prototype.catch = function (callback) {
    this.then(null, callback)
}

// 2: finally
// 无论什么情况都会执行，而且也会返回一个pomise，
// 这个promise的状态吸收自上一promise，跟finally的回调没关系
// 巧用then实现
Promize.prototype.finally = function (callback) {
    return this.then((data) => {
        callback()
        return data
    }, (e) => {
        callback()
        throw e
    })
}

// 3. resolve 静态方法
Promize.resolve = function (data) {

    return new Promize((resolve, reject) => {
        if (isPromize(data))
            data.then(resolve, reject)
        else
            resolve(data)
    })

}

// 4. reject 静态方法
Promize.reject = function (data) {

    return new Promize((resolve, reject) => {
        reject(data)
    })
}

// 5. Promise.all 静态方法
Promize.all = function (iterator) {

    // 如何判断都执行完了？ 用done计数，如果done和promise个数相等，说明最后一个任务也运行完了
    // 如何保证顺序 ？ 在循环内用作用域的新变量，把当前index存下来，这个变量和then回调形成闭包

    return new Promize((resolve, reject) => {

        try {
            const result = []
            let count = 0
            let done = 0
            for (const item of iterator) {
                let warpped = Promize.resolve(item)
                let idx = count
                warpped.then((res) => {

                    done++
                    result[idx] = res
                    if (done == count) {
                        // 当前是最后一个promise了
                        resolve(result)
                    }
                }).catch(e => {
                    reject(e)
                })

                count++
            }
        } catch (e) {
            reject(e)
        }
    })
}

// 6. Promise.allSettled 静态方法
// 利用 Promise.all，把所有promise包装一下
Promize.allSettled = function (iterator) {

    const prms = []
    for (const p of iterator) {
        const warpped = Promize.resolve(p)
        prms.push(
            warpped.then(res => {
                return {
                    state: FULFILLED,
                    value: res
                }
            }, e => {
                return {
                    state: FULFILLED,
                    value: e
                }
            })
        )
    }

    return Promize.all(prms)
}

// 7. Promise.race 静态方法
Promize.race = function (iterator) {
    return new Promize((resolve, reject) => {

        for (const p of iterator) {
            const warpped = Promize.resolve(p)
            warpped.then((res) => {
                resolve(res)
            }).catch(e => {
                reject(e)
            })
        }
    })
}

// 8. Promise.any 静态方法
Promize.any = function (iterator) {
    // 一个成功就成功，全部失败才失败
    return new Promize((resolve, reject) => {

        let count = 0
        let errorCount = 0
        const errs = []
        for (const p of iterator) {

            const idx = count

            const warpped = Promize.resolve(p)
            warpped.then((res) => {
                resolve(res)
            }).catch(e => {
                errorCount++
                errs[idx] = e

                if (errorCount == count)
                    reject(errs)
            })

            count++
        }

    })
}



/////// Test //////////////////////////////////
// const p1 = new Promize((resolve) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 1000);
// })
// const p2 = Promize.resolve(2)
// const p3 = Promize.resolve(3)
// const p4 = new Promize((resolve) => {
//     setTimeout(() => {
//         resolve(4)
//     }, 1);
// })
// const p5 = Promize.reject('error 5')
// Promize.all([p1, p2, p3, p4]).then(res => console.log(res))
// Promize.all([p1, p2, p3, p4, p5]).then(res => console.log(res)).catch(e => console.log(e))

const p1 = new Promize((resolve, reject) => {
    setTimeout(() => {
        reject(1)
    }, 1000);
})
const p2 = Promize.reject(2)
const p3 = Promize.resolve(3)
const p4 = new Promize((resolve, reject) => {
    setTimeout(() => {
        reject(4)
    }, 1);
})
// Promize.any([p1, p2, p3]).then(res => console.log(res)).catch(e => console.log('err', e))
// Promize.any([p1, p2, p4]).then(res => console.log(res)).catch(e => console.log('err', e))
Promize.race([p2, p1, p4]).then(res => console.log(res)).catch(e => console.log('err', e))
Promize.race([p1, p4]).then(res => console.log(res)).catch(e => console.log('err', e))
