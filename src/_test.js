var coinChange = function (coins, amount) {
    // 最少硬币 -- 最大面额
    const coinarr = coins.slice().sort((a, b) => b - a); //从大到小

    // 回溯，找答案
    let minCoinNum = Infinity;
    let ok = false
    let curSum = 0;
    let curNum = 0;
    function findAns() {
        if (ok) return
        if (curSum == amount) {
            minCoinNum = curNum
            ok = true
            return;
        }
        if (curSum > amount) return

        curNum++
        // 从最大的硬币试起
        for (let c of coinarr) {
            curSum += c
            findAns()
            curSum -= c
        }
        curNum--
    }
    findAns()

    if (minCoinNum < Infinity) return minCoinNum
    return -1
};


console.log(coinChange([1, 2, 5], 100))