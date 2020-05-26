const app = require('./app')
const port = process.env.PORT || 5000

app.get('/status', (req, res) => {
    response.status(200).json({
        message: 'working'
    })
})

app.listen(port,  () => {
    console.log(`Server started on port ${port}`)
})
