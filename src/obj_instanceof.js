/**
 * 实现instanceOf 
 * 考察原型链，如果a是B的实例，那么在a沿着原型链向上走一定能找到B.prototype
 */

function isInstanceOf(obj, constructor) {
    let proto = constructor.prototype
    let objProto = Object.getPrototypeOf(obj)
    while (true) {
        if (!objProto) return false // 找到原型链顶层了 objProto === null
        if (objProto === proto) return true
        objProto = Object.getPrototypeOf(objProto) //沿原型链往上找
    }
}
console.log(isInstanceOf([], Array));  // true