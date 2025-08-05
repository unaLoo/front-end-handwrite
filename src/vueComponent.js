/**
 * 实现一个响应式组件，在多次数据变更时，不会频繁触发render, 这就是vue的nexttick异步渲染原理
 */

const sfc = {
    _data: {
        name: 'wang'
    },
    tickCallback: new Set(),
    pending: false,

    init() {
        this.r = this.render.bind(this)

        // 初始化响应式数据
        this.data = new Proxy(this._data, {
            get(target, key) {
                return Reflect.get(target, key)
            },
            set: (target, key, newValue) => {
                Reflect.set(target, key, newValue)
                this.nextTick(this.r)
                this.flush()
            }
        })
    },

    nextTick(fn) {
        this.tickCallback.add(fn)
        this.flush()
    },

    flush() {
        if (this.pending === false) {
            this.pending = true
            Promise.resolve().then(() => {
                const cbs = [...this.tickCallback]
                this.tickCallback.clear()
                this.pending = false
                for (let cb of cbs) {
                    cb()
                }

                // 当 nextTick 中又新增了nextTick, 也就是在 nextTick 的 callback 中 又修改了数据，那需要派发下一次 flucsh
                if (this.tickCallback.size > 0) {
                    this.flush()
                }
            })
        }
    },

    render() {
        console.log('dom render, name is ', this._data.name)
    }
}

sfc.init()
sfc.nextTick(() => {
    console.log('start render')
})
sfc.data.name = 'dj1'
sfc.data.name = 'dj2'
sfc.data.name = 'dj3'
sfc.nextTick(() => {
    console.log('end render')
    sfc.data.name = 'not'
})

/* log:
    start render
    dom render, name is  dj7
    end render，
    dom render, name is  not
*/