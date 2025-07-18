/**
 * 实现一个响应式组件，在多次数据变更时，不会频繁触发render, 这就是vue的nexttick异步渲染原理
 */


class Component {
    data = { name: '' }; // 初始化一个名为 data 的属性，包含一个空字符串 name
    pending = false
    tickCallbacks = []

    constructor() {

        this.data = new Proxy(this.data, {
            set: (target, prop, value) => { // 注意是箭头函数
                Reflect.set(target, prop, value) // 保证了每次更改的有效性，在渲染时必定是最新数据

                // Main
                if (!this.pending) {
                    this.pending = true

                    Promise.resolve().then(() => {
                        this.render()
                        this.tickCallbacks.forEach(cb => cb())
                    })
                }

            }
        })
    }

    nextTick(cb) {
        if (cb) {
            this.tickCallbacks.push(cb)
        }
    }


    render() { // 定义一个 render 方法
        this.pending = false
        console.log(`render - name:${this.data.name}`); // 在控制台输出 render - name: 后跟当前 data.name 的值
    }
}

// 创建一个 Component 类的实例
const com = new Component();

// 连续三次修改 data.name 的值
com.data.name = 'a';
com.data.name = 'b';
com.data.name = '哲玄'; // 第一次触发 render

com.nextTick(() => {
    console.log('试图已更新！ ', com.data.name)
})
com.nextTick(() => {
    console.log('可以获取DOM！ ')
})


// 使用 setTimeout 延迟执行，再次修改 data.name 的值
setTimeout(() => {
    com.data.name = '哲玄前端'; // 第二次触发 render
});

