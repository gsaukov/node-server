const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user')
const errorHandler = require('../utils/errorHandler')
const config = require('../config/config')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        const passwordresult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordresult) {
            const token = jsonwebtoken.sign({
                email: candidate.email,
                userId: candidate._id
            }, config.jwt, {expiresIn: 3600})
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Wrong password'
            })
        }
    } else {
        console.log('User ' + req.body.email + ' not found')
        res.status(401).json({
            message: 'User not found'
        })
    }
}

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        res.status(409).json({
            message: 'User exists'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(req.body.password, salt)
        const user = new User({
            email: req.body.email,
            password: password
        })

        user.save().then(() =>  {
            console.log('User ' + user.email + ' registered')
            res.status(200).json({
                register: true
            })
        }).catch((e) => {
            console.log(e)
            errorHandler(res, e)
        })
    }
}
