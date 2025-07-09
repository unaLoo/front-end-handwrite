/**
 * 实现一个可链式调用的find函数
 */

const data = [
    { userId: 8, title: 'title1' },
    { userId: 11, title: 'other' },
    { userId: 15, title: null },
    { userId: 19, title: 'title2' },
]


function find(list) {
    let filtedList = list.slice()

    const ret = {

        where: (conditions) => {

            for (const [key, regx] of Object.entries(conditions)) {
                filtedList = filtedList.filter(item => {
                    return item[key] !== null && item[key].match(regx)
                })
            }

            return ret
        },

        orderBy: (key, direction) => {
            if (direction === 'desc')
                filtedList.sort((a, b) => b[key] - a[key])
            else if (direction === 'asc')
                filtedList.sort((a, b) => a[key] - b[key])

            return filtedList
        }
    }

    return ret

}



// find函数应该支持下面的调用
const result = find(data)
    .where({ "title": /\d$/ })
    .orderBy('userId', 'desc')

console.log(result)


