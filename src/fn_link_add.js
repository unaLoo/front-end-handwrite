/** 
 * 实现 .add 链式调用 .output输出结果
 */
function add(...args) {

    let sum = args.reduce((acc, cur) => {
        return acc + cur
    }, 0)

    const addable = {
        add(...args) {
            sum = args.reduce((acc, cur) => {
                return acc + cur
            }, acc)
            return addable
        },
        output() {
            console.log(sum)
            return addable
        }
    }
}

add(1,2,3).add(1).output()