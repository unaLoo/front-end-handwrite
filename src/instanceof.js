/**
 * 实现instanceOf
 */

function isInstanceOf(obj, constructor) {
    let proto = constructor.prototype
    let objProto = Object.getPrototypeOf(obj)
    while (true) {
        if (!objProto) return false // 找到原型链顶层了
        if (objProto === proto) return true
        objProto = Object.getPrototypeOf(objProto) //沿原型链往上找
    }
}
console.log(isInstanceOf([], Array));  // true