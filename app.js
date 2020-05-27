const express = require('express')
const analyticsRoutes = require('./routes/analytics')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const app = express()


app.use('/api/auth', analyticsRoutes)
app.use('/api/analityc', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app
