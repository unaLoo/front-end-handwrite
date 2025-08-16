// Loop`s Tips:
// arguments 是function内部才有的东西
// 他是该fn在被调用时传入的参数arr，他类似arr但不是arr
// 箭头函数内部就没这个东西
const fn1 = function () {
    console.log(arguments[0], arguments[1]) // 1，23
}
fn1(1, 23, 12, 3)

/////////////////////////////////////////
/**
 * 传入任意一个函数，只能调用指定的次数
 */
function limitedFuncCal(fn, times) {
    let count = times
    return function () {
        if (count > 0) {
            const args = [...arguments]
            fn.apply(this, args)
            count--
        }
    }
}

const logg = a => console.log(a);
const logg3 = limitedFuncCal(logg, 2);
logg3(2);
logg3(1);
logg3(3);
