/**
 * 实现一个事件总线 / 发布订阅模式
 */

class EventBus {

    constructor() {
        this.events = {} // 'name':[cb1, cb2]
    }

    on(eventType, callback) {
        if (eventType in this.events) {
            this.events[eventType].push(callback)
        } else {
            this.events[eventType] = [callback]
        }
    }

    off(eventType, callback) {
        if (eventType in this.events) {
            this.events[eventType] = this.events[eventType].filter((item) => item !== callback)
        }
    }

    once(eventType, callback) {
        const fn = (...args) => {
            callback(...args)
            this.off(eventType, fn)
        }
        this.on(eventType, fn)
    }

    emit(eventType, ...eventData) {
        if (eventType in this.events) {
            this.events[eventType].forEach(cb => {
                cb(...eventData)
            })
        }
    }

    destroy(eventType) {
        if (eventType in this.events) {
            delete this.events[eventType]
        }
    }
}


// test
const bus = new EventBus()
bus.on('created', () => {
    console.log(' created !')
})
bus.on('created', () => {
    console.log(' created 2 !')
})
bus.on('render', (elment) => {
    console.log(elment, ' render 1 ')
})
bus.once('render', (elment) => {
    console.log(elment, ' render 2')
})
bus.on('destroy', (el) => {
    console.log(el, ' is deleted!')
})

bus.emit('created')
bus.emit('render', ' ##loop`s element##')
bus.emit('render', ' ##loop`s element##')
bus.emit('render', ' ##loop`s element##')
bus.emit('render', ' ##loop`s element##')
bus.emit('destroy', ' ##loop`s element##')