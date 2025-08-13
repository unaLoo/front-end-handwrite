/**
 * 实现快速排序
 */
function qkSort(arr) {

    function core(arr, L, R) {
        if (L >= R) return

        const mid = (L + R) / 2 | 0;
        [arr[L], arr[mid]] = [arr[mid], arr[L]]//避免每次都直接取第一个

        const pivot = arr[L]
        let i = L, j = R

        while (i < j) {
            while (i < j && arr[j] > pivot) j--
            while (i < j && arr[i] <= pivot) i++
            if (i < j)
                [arr[i], arr[j]] = [arr[j], arr[i]]
        }

        [arr[L], arr[i]] = [arr[i], arr[L]]
        core(arr, L, i - 1)
        core(arr, i + 1, R)
    }

    const left = 0
    const right = arr.length - 1
    core(arr, left, right)

    return arr
}



const arr = new Array(25).fill(0).map(_ => Math.floor(Math.random() * 400 + Math.random() * 600))
qkSort(arr)
console.log(arr)
