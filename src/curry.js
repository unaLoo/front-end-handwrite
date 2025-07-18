// Loop`s Tips:
// function fn(a, b, c){} 
// fn.length ==> 3 也就是参数的个数

// 在function内部有个内建变量 arguments 
// arguments 是一个对应于传递给函数的参数的类数组对象。它不是数组，但是可迭代对象
/**
    function func1(a, b, c) {
        console.log(arguments[0]);
        // Expected output: 1

        console.log(arguments[1]);
        // Expected output: 2

        console.log(...arguments);
        // Expected output: 3
    }

    func1(1, 2, 3);
*/

/**
 * 柯里化（Currying）是函数式编程中的一个重要概念。
 * 它是一种将接受多个参数的函数转换为一系列只接受一个参数的函数的技术。
 * 每个函数都返回一个新的函数，直到所有参数都被接收，最终返回最终结果。 
 */
function theCurry(fn) {
    const argsLength = fn.length
    return function curried() {
        if (arguments.length >= argsLength) {
            return fn.apply(this, arguments)
        }
        else {
            return curried.bind(this, ...arguments)
        }
    }
}


// test1
function plus(a, b, c, d) {
    return a + b + c + d
}
// const res = plus(1, 2, 3, 4) // 10
const currryPlus = theCurry(plus)
const plus_base1 = currryPlus(1)
const plus_base12 = plus_base1(2)
const plus_base123 = plus_base12(3)
console.log(plus_base123(4))


// test 2
function sum(a, b, c) {
    return a + b + c;
}
const curried = theCurry(sum);
console.log(curried(1)(2)(3)) // 6
console.log(curried(1, 2)(3)) // 6


// 一个柯里化函数
function sum2(...args1) {
    let x = args1.reduce((prev, next) => { return prev + next; })
    return function (...args2) {
        if (args2.length == 0) return x;
        let y = args2.reduce((prev, next) => { return prev + next; })
        return sum2(x + y)
    }
}
console.log(sum2(1, 2, 2, 5)(7)()) // 17


console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
/**
 *  实现一个柯里化函数add，使得 
 *  add(1,2,3).valueOf() // 6
 *  add(1,2)(3).valueOf() // 6
 */

function add(...args) {

    let params = args

    function fn(...arguments) {
        params = args.concat(arguments)
        // return fn.bind(this, ...params)
        return add(...params) // !! 注意这里，返回外层这个add函数，这样才袋有valueOf方法
    }
    fn.valueOf = function () {
        return params.reduce((acc, cur) => {
            return acc + cur
        }, 0)
    }

    return fn
}


console.log(add(1)(2, 3)(4).valueOf())