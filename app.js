const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config/config')

const analyticsRoutes = require('./routes/analytics')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')

const app = express()

mongoose.connect(config.mongoUri)
    .then(() => console.log('MongoDb Connected'))
    .catch((error) => console.log(error))

app.use(cors())
app.use(morgan('dev')) // logging

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/analityc', analyticsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app
