/**
 * 最长公共前缀
 */
function longestCommonPrefix(strArr) {

    let base = strArr[0].slice()
    for (let i = 1; i < strArr.length; i++) {
        while (strArr[i].indexOf(base) !== 0) {
            base = base.slice(0, base.length - 1)
        }
        if(base.length === 0) return ''
    }
    return base
}
// test
let strs = ['helly', 'hellow', 'helddl'];

console.log(longestCommonPrefix(strs)); // hell







// function longestPrefix(arr) {
//     if (arr.length === 0) {
//         return '';
//     }
//     let prefix = arr[0];
//     for (let i = 1; i < arr.length; i++) {
//         while (arr[i].indexOf(prefix) !== 0) {
//             prefix = prefix.substring(0, prefix.length - 1);
//             if (prefix.length === 0) {
//                 return '';
//             }
//         }
//     }
//     return prefix;
// }

// // test
// let strs = ['helly', 'hellow', 'hell'];

// console.log(longestPrefix(strs)); // hell
