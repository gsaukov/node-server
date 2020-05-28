const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports.login = function (req, res) {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })
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
            res.status(500).json({
                message: 'Failed to persist'
            })

        })
    }

}
