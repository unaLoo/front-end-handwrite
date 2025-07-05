/**
 * 插入排序和选择排序
 */
function insertSort(arr) {
    // 插入选择，遍历元素，把元素插入到已有序列中

    // 保持以[0,i-1]为已有序列，遍历[i,arr.length]的元素插入其中
    for (let i = 1; i < arr.length; i++) {
        const el = arr[i]
        let j = i - 1
        while (j >= 0 && arr[j] > el) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = el
    }

    return arr
}

function selectSort(arr) {
    // 选择排序，遍历元素，计算最小值，放到元素末尾
    let min, minId
    for (let i = 0; i < arr.length; i++) {
        min = Infinity
        minId = -1
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < min) {
                min = arr[j]
                minId = j
            }
        }
        if (minId != -1) {
            // 插入
            [arr[i], arr[minId]] =
                [arr[minId], arr[i]]
        }
    }
    return arr
}

const arr = new Array(50).fill(0).map(_ => Math.floor(Math.random() * 100))
console.log(insertSort(arr))

const arr2 = new Array(50).fill(0).map(_ => Math.floor(Math.random() * 100))
console.log(selectSort(arr2))