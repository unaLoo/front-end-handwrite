/**
 * 实现一个并行上传器，可以同时上传n个，上传一张补一张，保证同时有n个在上传
 */

const urls = [
    'http://exp/1.jpg',
    'http://exp/2.jpg',
    'http://exp/3.jpg',
    'http://exp/4.jpg',
    'http://exp/5.jpg',
    'http://exp/6.jpg',
    'http://exp/7.jpg',
    'http://exp/8.jpg',
    'http://exp/9.jpg',
    'http://exp/10.jpg',
]

class MultiUploader {

    constructor(num) {
        this.limit = num
        this.waiting = []
        this.uploading = []
    }

    upload(url) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(url + ' uploaded!')
            }, Math.random() * 100 + 2000);
        })
    }

    init(list) {
        // init task
        list.forEach(li => {
            new Promise((resolve) => {
                this.waiting.push({
                    upload: () => this.upload(li),
                    resolve,
                })
            })
        })
    }

    run() {

        while (this.waiting.length > 0 && this.uploading.length < this.limit) {

            const task = this.waiting.shift()

            const p = task.upload().then((res) => {
                console.log('!!!  ' ,res)
                task.resolve(res)
                this.uploading = this.uploading.filter(item => item != p)
                this.run() // 调度下一个
            })

            this.uploading.push(p)

        }
    }
}
const uploader = new MultiUploader(5)
uploader.init(urls)
uploader.run()
