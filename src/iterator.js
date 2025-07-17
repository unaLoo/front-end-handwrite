/**
 * 把一个普通对象转为可迭代对现象
 */

/**
 * JS中的Iterator 对象提供了 next() 方法用以返回迭代器结果对象。
 * Iterator 实例的 [Symbol.iterator]() 方法实现了可迭代协议，它返回 this 的值，即迭代器对象本身。
 * 迭代器支撑着展开语法和 for...of 循环。
 */

/*
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
*/

const obj = {
    a: 'alpha',
    b: 'beta',
    c: 'cigma'
}

// for (const val of obj) {
//     console.log(val)
// }
// 直接遍历报错：TypeError: obj is not iterable


function makeObjIterabel1(obj) {
    // 直接实现迭代器
    obj[Symbol.iterator] = function () {
        let keys = Object.keys(obj)
        let index = 0
        return {
            next: () => {
                if (index >= keys.length) return {
                    value: undefined,
                    done: true
                }

                let key = keys[index++]
                return {
                    value: [key, obj[key]],
                    done: false
                }
            }
        }
    }
}

function makeObjIterabel2(obj) {
    // 使用生成器
    function* help() {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]]
        }
    }
    obj[Symbol.iterator] = help
}
makeObjIterabel2(obj)
for (const val of obj) {
    console.log(val)
}