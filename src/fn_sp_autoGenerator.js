// 通常 generator 需要我们手动调用 .next 方法
function* foo() {
    yield 1
    yield 2
    return 3
}

const gen = foo()
console.log(gen.next())
console.log(gen.next())
console.log(gen.next()) // {value:3, done:true}

// 但是 async/await 却是自动调用的, 下面实现自动调用机制

function autoRun(genFn) {
    return function (...args) {

        const generator = genFn.call(this, ...args)

        return new Promise((resolve, reject) => {

            const nextStep = (nextRes) => {
                if (nextRes.done) {
                    resolve(nextRes.value)
                    return
                }
                // 确保异步，当 yield 一个普通值或者 promise 时都是 OK 的
                Promise.resolve(nextRes.value)
                    .then(res => nextStep(generator.next(res)))
                    .catch(e => reject(e))

            }

            nextStep(generator.next())
        })
    }
}

const autoFoo = autoRun(foo)

async function test() {
    const res = await autoFoo()
    console.log(res)
}

test() // 直接拿到结果 3 