const express = require('express')
const controller = require('../controllers/analytics')
const router = express.Router()

router.get('/login', controller.overview)
router.get('/register', controller.analytics)

module.exports = router
