/** 
    function Animal(name) {
        this.name = name;
    }

    const a = Animal('a') // this指向全局
    const b = new Animal('a') // this指向新开辟的对象
    console.log(a) // undefined
    console.log(b) // Animal {name: 'a'}
 */


/**
 * 实现 new
 */
function theNew(klass, ...args) {

    // 1
    // const obj = Object.create(klass.prototype)
    // 2
    const obj = {}
    obj.__proto__ = klass.prototype

    // 1
    // klass.apply(obj, args)
    // return obj

    // 2 貌似有的构造函数还有返回值？
    const res = klass.apply(obj, args)
    return typeof res === 'object' ? res : obj
}


function Animal(name) {
    this.name = name;
}

let animal = theNew(Animal, 'dog');
console.log(animal)  // dog
