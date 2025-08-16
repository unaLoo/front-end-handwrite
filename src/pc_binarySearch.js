/////////////////////////////////////////
/**
 * 实现二分查找
 */
function binarySearch(arr, target) {

    function core(arr, left, right, target) {
        if (left > right) return -1
        let mid = (left + right) / 2 | 0
        if (arr[mid] > target) {
            return core(arr, left, mid - 1, target)
        } else if (arr[mid] < target) {
            return core(arr, mid + 1, right, target)
        } else {
            return mid
        }
    }

    return core(arr, 0, arr.length - 1, target)
}

// test
const arr = new Array(50)
    .fill(0)
    .map(_ => Math.floor(Math.random() * 123))
    .sort((a, b) => a - b)
console.log('arr:', arr)
console.log(binarySearch(arr, 52))
