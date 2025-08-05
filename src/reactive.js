/**
 * 简单模仿Vue2和Vue3的对象数据劫持
 */


function isObject(o) {
    if (typeof o === 'object' && o !== null) return true
    return false
}

// vue2
function observe(obj) {
    if (!isObject(obj)) return;

    Object.keys(obj).forEach(key => {

        let val = obj[key]
        observe(val)
        Object.defineProperty(obj, key, {
            get() {
                console.log('tracking ', key);
                return val;
            },
            set(newVal) {
                if (newVal === val) return;
                val = newVal;
                observe(newVal);
                console.log('trigger ', key, newVal);
            }
        });
    });

    return obj
}

// vue3
function createReactiveObject(obj) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            console.log('tracking ', key)
            return isObject(res) ? createReactiveObject(res) : res
        },
        set(target, key, val, receiver) {
            const res = Reflect.set(target, key, val, receiver)
            console.log('trigger ', key, val)
            return res
        }
    })
}

// test
const object = {
    'name': 'Jack',
    'age': 15,
    'father': {
        'name': 'Armstrong',
        'age': 42,
    },
    'mother': {
        'name': 'Jelly',
        'age': 40,
    }
}
const obj2 = structuredClone(object)

const a = observe(object)
a.father.name = 'ArmNotStrong'
console.log(a)
console.log(a.father)
console.log(a.father.name)

console.log('===============================')

const b = createReactiveObject(obj2)
b.name = 'Yee'
b.mother.name = 'sakura'
console.log(b)
console.log(b.mother)
console.log(b.mother.name)