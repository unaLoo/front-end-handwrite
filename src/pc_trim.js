/**
 * 实现字符串的trim函数
 */
// 正则表达式实现
function theTrim1(str) {
    // const regex = new RegExp(/^\s+|\s+&/, 'g')
    // const res = str.replace(regex, '')
    // return res
    return str.replace(/^\s+|\s+$/,'')
}
// 对撞指针实现
function theTrim2(str) {
    let l = 0
    let r = str.length - 1

    while (l < str.length && str[l] == ' ') l++
    while (r > str.length && str[r] == ' ') r--

    if (l < r) return str.slice(l, r + 1)
    else return ''
}

const str = '  haea asd asdad   '
console.log(theTrim1(str))
console.log(theTrim2(str))