/**
 * 并发任务控制
 */

class SuperTask {

    constructor(option) {
        this.poolSize = option.size || 2
        this.excuting = []
        this.waiting = []
    }

    setPoolSize(num) {
        this.poolSize = num
        this.run()
    }

    add(fn) {
        return new Promise((resolve, reject) => {
            this.waiting.push({
                fn, resolve, reject
            })
            this.run()
        })
    }

    run() {
        while (this.waiting.length > 0 && this.excuting.length < this.poolSize) {
            const task = this.waiting.shift()
            
            const p = task.fn()
                .then((taskResult) => {
                    this.excuting = this.excuting.filter((item) => item != p)
                    task.resolve(taskResult)
                    this.run()
                })
            this.excuting.push(p)
        }
    }

}

/////// 测试 //////////////////////////////////

// 创建 SuperTask 实例，初始并发数为 2
const superTask = new SuperTask({ poolSize: 2 });


// 模拟任务
async function timeout(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

function addTask(time, name) {
    const label = `任务${name}，完成`;
    console.time(label);
    superTask.add(() => timeout(time)).then(() => {
        console.timeEnd(label);
    });
}

// 添加 5 个任务
addTask(10000, 1); // 10s 后输出：任务1完成
addTask(5000, 2);  // 5s  后输出：任务2完成
addTask(3000, 3);  // 8s  后输出：任务3完成
addTask(4000, 4);  // 11s 后输出：任务4完成
addTask(5000, 5);  // 12s 后输出：任务5完成

// // 7 秒后把并发数调整为 5
setTimeout(() => {
    superTask.setPoolSize(5);
}, 7000);
