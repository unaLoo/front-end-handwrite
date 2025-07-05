// Loop`s tips:
// replace 函数的第二个参数可以是一个函数，每个匹配的substr会作为参数传递给第二个函数
// 还区分是否使用捕获组()
// 使用的话，replacer参数为 matched, captured, offset
// 未使用的话，replacer参数为 matcher offset

/////////////////////////////////////////
/**
 * 实现下划线转驼峰，下划线转驼峰
 * 'hello_world' <--> 'helloWorld'
 */
function underline2Camel(str) {
    // 1 不使用捕获组, 
    return str.replace(/_[a-z]/g, (match, offset) => {
        // console.log(match, offset) // _d 5   _w 15
        return match[1].toUpperCase()
    })
    // // 2 使用捕获组 
    // return str.replace(/_([a-z])/g, (match, captured, offset) => {
    //     console.log(match, captured, offset) // _d d 5    _w w 15
    //     return captured.toUpperCase()
    // })
}

function camer2Underline(str) {
    return str.replace(/[A-Z]/g, (match) => {
        return '_' + match.toLowerCase()
    })
}

const str = 'hello_dangerous_world'

console.log(underline2Camel('hello_dangerous_world'))
console.log(camer2Underline(underline2Camel('hello_dangerous_world')))
