/**
 * 实现图片下载
 */

async function downloadImg(srcUrl, imgName) {

    // // 如果srcUrl对应的服务已经设置好了响应头，可以直接触发浏览器下载，那直接创建a标签
    // const a = document.createElement('a')
    // a.href = srcUrl
    // a.download = imgName
    // a.click()
    // a.remove()

    // 如果后端没有设置，那需要在前端创建url
    fetch(srcUrl).then((response) => {
        return response.blob()
    }).then((blob) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = srcUrl
        a.download = imgName
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
    })

}
const url = 'https://img-s.msn.cn/tenant/amp/entityid/AA1IKKwt.img?w=534&h=343&m=6&x=319&y=137&s=300&d=141'
const imgName = 'test.jpg'
downloadImg(url, imgName)

