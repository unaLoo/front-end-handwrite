/**
 * 实现数组扁平化
 */
function flatten(arr) {
    let result = []
    for (item of arr) {
        if (Array.isArray(item)) {
            // result.push(flatten(item)) // 注意flatten返回的是数组
            // result.concat(flatten(item)) // 注意concat返回新数组
            result = result.concat(flatten(item))
        } else {
            result.push(item)
        }
    }
    return result
}

function flatten2(arr) {
    return arr.reduce((acc, cur) => {
        // concat方法将数组和/或值，合并到一个新的数组中
        if (Array.isArray(cur)) {
            return acc.concat(flatten2(cur))
        } else {
            return acc.concat(cur)
        }
    }, [])
}



console.log(flatten2([1, [1, 2, [2, 4]], 3, 5]));  // [1, 1, 2, 2, 4, 3, 5]