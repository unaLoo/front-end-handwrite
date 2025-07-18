/**
 * 给几个属性,求这几个属性能搭配出的结果,笛卡尔积
 * ['戴尔', '苹果', '联想'], 
 * [ '笔记本', '平板电脑','PC机', '上网本'],
 * [ '黑色', '银色', '白色'],
 */

const arr = [
    ['戴尔', '苹果', '联想'],
    ['笔记本', '平板电脑', 'PC机', '上网本'],
    ['黑色', '银色', '白色'],
]

function cartesianProduct(data) {

    const result = []
    let cur = []

    function backTrace(level) {

        if (level === data.length) {
            result.push(cur.slice())
            return
        }

        for (let item of data[level]) {
            cur.push(item)
            backTrace(level + 1)
            cur.pop()
        }
    }
    backTrace(0)
    return result

}

console.log(cartesianProduct(arr))