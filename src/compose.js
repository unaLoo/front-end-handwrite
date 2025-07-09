/* 背景：函数组合是函数式编程中的一个重要概念,主要有compose和pipe两类
    func1(
        func2(
            func3(
                func4(value)
            )
        )
    );
    ///// compose //////
    compose(func1,func2,func3,func4)(value)
    可以看到，compose的执行顺序应该是自右向左

    ///// pipe //////
    pipe(func4, func3, func2, func1)(value);
    pipe的执行顺序是自左向右
*/

/**
 * 接收若干个函数作为参数，每个函数执行后的输出作为下一个函数的输入。
 * 执行方向是自右向左的，初始函数的参数在最右边。
 */
function compose(...fns) {
    return function (arg) {
        // reduceRight的顺序是自右向左， reduce是自左向右
        return fns.reduceRight((acc, cur) => {
            return cur(acc)
        }, arg)
    }
}

function pipe(...fns) {
    return function (arg) {
        return fns.reduce((acc, cur) => {
            return cur(acc)
        }, arg)
    }
}


// 补充，如果不允许用reduce? 那自己写一个呗
function theReduce(arr, callback, initVal) {
    let acc = initVal || null
    for (let item of arr) {
        acc = callback(acc, item)
    }
    return acc
}


// const add = x => x + 1;
// const multiply = x => x * 2;
// const minus = x => x - 1;

// console.log(compose(minus, multiply, add)(1)) // 3


