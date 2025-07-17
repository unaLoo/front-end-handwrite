/**
 *      
 * 实现 function lazyMan(){}
    支持 
    1. lazyMan('tom').sleep(10).eat('burger')
        - hi, I`m tom
        - sleeping 10 seconds
        - eat burger
    2. lazyMan('tom').eat('apple').eat('rice')
        - hi, I`m tom
        - eat apple
        - eat rice
    3. lazyMan('tom').eat('apple').sleepFirst(5).sleep(5).eat('egg')
        - sleeping 5 seconds
        - hi, I`m tom
        - eat apple
        - sleepisng 5 seconds
        - eat egg
 */



// 1. 同步收集依赖
function lazyMan(name) {

    const task = [{
        type: 'sync',
        log: `hi, I am ${name}`
    }]

    const instance = {
        task: task,
        sleep: (time) => {
            task.push({
                type: 'async',
                val: time,
                log: `sleeping ${time} seconds`
            })
            return instance
        },
        eat: (food) => {
            task.push({
                type: 'sync',
                log: `eat ${food}`
            })
            return instance
        },
        sleepFirst: (time) => {
            task.unshift({
                type: 'async',
                val: time,
                log: `sleeping for ${time} seconds...`
            })
            return instance
        }
    }

    const exec = () => {
        const t = task.shift()
        if (!t) return
        // excute t
        if (t.type == 'async') {
            console.log(t.log)
            setTimeout(() => {
                exec()
            }, t.val * 1000);
        } else {
            console.log(t.log)
            exec()
        }
    }

    setTimeout(() => {
        exec()
    });

    return instance
}

// lazyMan('tom').sleep(2).eat('burger')
// lazyMan('tom').eat('apple').eat('rice')
lazyMan('tom').eat('apple').sleepFirst(5).sleep(5).eat('egg')