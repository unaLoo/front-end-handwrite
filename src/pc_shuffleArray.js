/**
 * 洗牌算法
 * 打乱数组顺序
 */

/**
 * 实现一个函数，返回指定位数的随机数，其中包括a-z A-Z 0-9
 */
const pool = []
for (let i = 0; i < 10; i++) {
    pool.push(i)
}
for (let i = 'a'.charCodeAt(); i <= 'z'.charCodeAt(); i++) {
    const lettle = String.fromCharCode(i)
    pool.push(lettle)
    pool.push(lettle.toUpperCase())
}

function shuffelArray(len) {
    const res = []

    for (let i = 0; i < pool.length; i++) {
        const j = Math.floor(Math.random() * pool.length);
        [pool[i], pool[j]] = [pool[j], pool[i]]
    }

    for (let i = 0; i < len; i++) {
        res.push(pool[i])
    }

    return res.join('')
}

console.log(shuffelArray(16))
console.log(shuffelArray(16))
console.log(shuffelArray(16))
console.log(shuffelArray(16))
console.log(shuffelArray(16))
