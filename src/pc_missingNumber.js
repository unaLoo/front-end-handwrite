/**
 * [1,2,3,5,6] 求缺失的数字？
 * 
 */
function missingNumber(arr) {
    console.log('原数组：', arr);
    const missing = []
    let curVal = 1
    let i = 0
    while (i < arr.length) {
        if (arr[i] == curVal) {
            curVal++
            i++
        } else {
            missing.push(curVal)
            curVal++
        }
    }
    return missing
}


const generateArray = limit => {
    let arr = [];
    for (let i = 1; i <= limit; i++) {
        arr.push(i);
    }
    // 随机删除几个数
    for (let i = 1; i <= arr.length / 3; i++) {
        const rand = Math.round(Math.random() * limit);
        arr.splice(rand, 1);
    }
    return arr;
};

console.log(1)
const arr = generateArray(20);
console.log('缺失的数：', missingNumber(arr))
