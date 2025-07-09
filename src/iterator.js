/**
 * 把一个普通对象转为可迭代对现象
 */

/**
 * JS中的Iterator 对象提供了 next() 方法用以返回迭代器结果对象。
 * Iterator 实例的 [Symbol.iterator]() 方法实现了可迭代协议，它返回 this 的值，即迭代器对象本身。
 * 迭代器支撑着展开语法和 for...of 循环。
 */
const arrayLike = {
    0: "小白",
    1: "小黑",
    2: "小灰",
    length: 3
}
// 对于这样的类数组对象，我们很容易实现迭代器
arrayLike[Symbol.iterator] = function () {
    let index = 0
    return {
        next: () => {
            if (index < this.length) {
                const res = {
                    value: this[index],
                    done: false
                }
                index++
                return res
            } else {
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}
for (const value of arrayLike) {
    console.log(value);
}


