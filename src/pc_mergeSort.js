/**
 * 归并排序
 */
function merge(arr1, arr2) {
    const res = []
    let i = 0, j = 0
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            res.push(arr1[i++])
        }
        else if (arr1[i] > arr2[j]) {
            res.push(arr2[j++])
        } else {
            res.push(arr1[i++], arr2[j++])
        }
    }
    while (i < arr1.length) {
        res.push(arr1[i++])
    }
    while (j < arr2.length) {
        res.push(arr2[j++])
    }
    return res
}

const arr1 = [1, 3, 5, 11]
const arr2 = [2, 5, 6, 9]

function mergeSort(arr) {

    if (arr.length == 1) return arr;

    const middle = arr.length / 2 | 0;
    const leftPart = arr.slice(0, middle)
    const rightPart = arr.slice(middle)
    return merge(mergeSort(leftPart), mergeSort(rightPart))
}


const arr = new Array(20).fill(0).map(_ => Math.random() * 100 | 0)
console.log(mergeSort(arr));  // [1, 2, 3, 4, 5, 6]