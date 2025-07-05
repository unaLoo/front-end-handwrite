/**
 * 实现数组去重
 */
function unique0(arr) {
    return Array.from(new Set(arr))
}

function unique1(arr) {
    return arr.filter((val, idx) => {
        return arr.indexOf(val) === idx
    })
}

function unique2(arr) {
    return arr.reduce((acc, cur) => {
        if (acc.includes(cur) == false)
            acc.push(cur)
        return acc
    }, [])
}

function unique(arr) {
    let i = 0
    while (i < arr.length) {
        if (arr.indexOf(arr[i]) !== i) {
            arr.splice(i, 1)
        } else {
            i++
        }
    }
    return arr
}
const arr = [12, 12, 12, 44, 51, 25, 1, 512, 13, 12]
console.log(unique0(arr))


