/////////////////////////////////////////
/**
 * 实现bind方法
 * bind(thisArg)
 * bind(thisArg, arg1)
 * bind(thisArg, arg1, arg2)
 * 注意：返回的是箭头函数，这样才能访问外部的this
 */
Function.prototype.theBind = function (thisArg, ...args) {
    return (...newArgs) => {
        this.apply(thisArg, [...args, ...newArgs])
    }
}


// test 1
function hello(str, str2) {
    console.log(str + ', I am ', this.name, str2)
}
const jackHello = hello.theBind({ name: 'jack' }, 'Goodmorning')
jackHello('Byebye~')
jackHello()

// test 2
const test = {
    name: "fy",
    showName: function (last) {
        console.log(this.name + " is " + last);
    },
};
test.showName('man')
const jackShowName = test.showName.theBind({ name: 'jack' })
jackShowName('women')