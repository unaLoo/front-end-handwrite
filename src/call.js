/////////////////////////////////////////
/**
 * 实现call
 * fn.call(thisArg, arg1, arg2)
 */
Function.prototype.theCall = function (thisArg, ...args) {
    const context = thisArg ?? window
    const sym = Symbol()
    context[sym] = this
    const res = context[sym](...args)
    delete context[sym]
    return res
}

const jack = {
    name: 'jack',
    hello(bye) { // 等价于 hello: funciton(bye){
        console.log('hello, I am ', this.name)
        console.log(bye)
        return '__' + bye + '__'
    }
}
console.log(jack.hello('bye')) // __bye__
const ming = { name: 'ming' }
console.log(jack.hello.theCall(ming, 'goodbye'))// __goodbye__