const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
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
app.use('/uploads', express.static('uploads')) // mark as static resources to allow file access

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use('/api/analytics', analyticsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app
