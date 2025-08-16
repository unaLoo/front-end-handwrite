/**
 * 实现apply，他是function原型上的方法
 * apply(thisArg)
 * apply(thisArg,argsArray)
 */
Function.prototype.theApply = function (thisArg, args) {
    const context = thisArg ? thisArg : window
    const sym = Symbol()
    context.sym = this
    if (!args) {
        context.sym()
    } else {
        context.sym(...args)
    }
}
// test
window.name = 'hello'
let jck = {
    name: 'jack'
}
function testFunction(arg1, arg2, arg3) {
    console.log(this.name, arg1, arg2, arg3)
}
testFunction() // 'hello' undefined undefined undefined
testFunction.theApply(jck, [1, 2, 3]); // 'jack' 1 2 3