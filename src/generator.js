/** 利用生成器实现下面的函数
 * 
    function generator(){
        // ...
    }   

    // const gen = generator(5)
    // gen.next(3).value;  3 + 0 < 5 , return 3
    // gen.next(6).value;  5 + 1 > 5 , return 0
 */

// 当next()带参数时，他的参数会是{{上一个yield}}的返回值

function generator(arg) {

    function* _gen(threshold) {
        let call = 0
        while (true) {
            const inputVal = yield
            console.log(inputVal, call, threshold)
            const res = inputVal + call > threshold ? 0 : inputVal
            call++
            yield res
        }
    }

    const iterator = _gen(arg)

    // // 1
    // return {
    //     next: (value) => {
    //         // 因为有俩yield，第一个yield会定位到input,第二个yield的产出才是题干需要的
    //         iterator.next()
    //         return iterator.next(value)
    //     }
    // }

    // 2
    const theNext = iterator.next.bind(iterator)
    iterator.next = (val)=>{
        theNext()
        return theNext(val)
    }
    return iterator
}

const g = generator(5)
console.log(g.next(3)) 
console.log(g.next(5))