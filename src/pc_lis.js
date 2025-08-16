/**
 * 最长递增子序列
 * dp[i]= 1 + max({dp[j]∣j<i 且 arr[j]<arr[i]})
 */
function lis(arr) {

    const dp = new Array(arr.length).fill(1)
    // 单个元素就是一个满足条件的子序列

    for (let i = 1; i < arr.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (arr[i] > arr[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    console.log(dp)
    return Math.max(...dp)
}

const arr = [1, 5, 2, 6, 3, 4, 1, 3]
console.log(lis(arr))



// /**
//  * 最长递增子序列
//  *
//  * @param {number[]} array
//  * @returns {number[]}
//  */
// function lis(array) {
//   if (array.length === 0) return 0;
//   const arr = new Array(array.length).fill(1);
//   for (let i = 1; i < array.length; i++) {
//     for (let j = 0; j < i; j++) {
//       if (array[i] > array[j]) {
//         arr[i] = Math.max(arr[i], arr[j] + 1);
//       }
//     }
//   }
//   let result = 1;
//   for (let i = 0; i < arr.length; i++) {
//     result = Math.max(result, arr[i]);
//   }
//   return result;
// }
