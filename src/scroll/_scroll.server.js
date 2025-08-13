const express = require('express')


/////// MockData //////////////////////////////////
const TotalCount = 300
const data = new Array(TotalCount).fill(0).map((_, i) => ({
    id: i + 1,
    title: `这是第 ${i + 1} 条数据`,
    description: `这是一段描述信息，编号 ${i + 1}`,
}))



/////// HTTP-SERVER //////////////////////////////////
const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Max-Age', '3600')

    if (req.method == 'OPTIONS') {
        return res.sendStatus(204)
    }
    next()
})

/**
 * 分页接口
 * GET /api/list?page=18&limit=20
 */
app.get('/api/list', (req, res) => {

    let { page, limit } = req.query
    page = parseInt(page)
    limit = parseInt(limit)

    const totalPage = Math.ceil(TotalCount / limit)

    const startIdx = (page - 1) * limit
    const endIdx = startIdx + limit

    console.log(startIdx, endIdx)
    const result = data.slice(startIdx, endIdx)

    // setTimeout(() => {
    res.json({
        page,
        limit,
        total: totalPage,
        data: result
    })
    // }, 2000);

})

app.listen(3000, () => {
    console.log('server starting on 3000');
})