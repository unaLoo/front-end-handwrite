/** Loop`s Tips:
1.数组的解构[...arr],对象的解构{...obj}，Map和Set的解构都是[...obj]

2.解构会分配新的内存空间,但是是在顶层数据解构上分配新的空间，对于嵌套的引用类型不会被copy出一个新的
const arr = [{ color: 'red', sex: 'male' }, { color: 'black', sex: 'male' }]
const deStructed = [...arr]
deStructed[0].sex = 'female'
console.log(arr) // [ { color: 'red', sex: 'female' }, { color: 'black', sex: 'male' } ]
console.log(deStructed) // [ { color: 'red', sex: 'female' }, { color: 'black', sex: 'male' } ]

3. Object.keys(obj) 会获取对象本身的可枚举的字符串的key； Reflect.ownKey(obj) 可以获取对象本身的所有key
const obj = { a: 'aa' }
Object.defineProperty(obj, Symbol(), {
    enumerable: true,
    value: 123
})
Object.defineProperty(obj, 'b', {
    enumerable: false,
    value: 345
})
console.log(Object.keys(obj)) // [ 'a' ] 
console.log(Reflect.ownKeys(obj)) // [ 'a', 'b', Symbol() ]
*/

/**
 * 实现对象的深拷贝函数
 */
function deepClone(obj) {

    if (typeof obj != 'object' || obj == null) return obj

    let copy

    if (Array.isArray(obj)) {
        copy = []
        for (let item of obj) {
            copy.push(deepClone(item))
        }
    }
    else if (obj instanceof Set) {
        copy = new Set([...obj])
    }
    else if (obj instanceof Map) {
        copy = new Map([...obj])
    }
    else { // Object
        copy = {}
        Reflect.ownKeys(obj).forEach(key => {
            copy[key] = deepClone(obj[key])
        })
    }

    return copy
}

// test
const obj = { a: 'aa' }
Object.defineProperty(obj, Symbol(), {
    enumerable: true,
    value: 123
})
Object.defineProperty(obj, 'b', {
    enumerable: false,
    value: [1, 2, 3]
})
const copy = deepClone(obj)
copy.b[1] = 5
console.log(obj.b)
console.log(copy)
