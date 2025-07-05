// Loop`s Tips:
// 依次执行，并且结果作为下一次的参数，想起来用reduce函数
// reduce(callbackFn)
// reduce(callbackFn, initialValue)
// 它按升序对数组中的所有元素运行一个“reducer”回调函数，并将它们累积到一个单一的值中。
// reduce 函数的返回值就是最终累计的结果
// 每次调用时，callbackFn 的返回值都作为 accumulator 参数传递到下一次调用中。


/**
 * 接收若干个函数作为参数，每个函数执行后的输出作为下一个函数的输入。
 * 执行方向是自右向左的，初始函数的参数在最右边。
 */
function compose(...fns) {
    return function (arg) {
        return fns.reverse().reduce((acc, cur) => {
            return cur(acc)
        }, arg)
    }
}


// const add = x => x + 1;
// const multiply = x => x * 2;
// const minus = x => x - 1;

// console.log(compose(minus, multiply, add)(1)) // 3