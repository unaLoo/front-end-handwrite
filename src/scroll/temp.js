const express = require('express')

const app = express()

app.post('/f', (req, res) => {
    res.send('ok')
})

app.get('/', (req, res) => {
    res.json({
        'text': 'hawe'
    })
})

app.listen(3000, () => {
    console.log('start..');
})