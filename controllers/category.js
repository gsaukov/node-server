const Category = require('../models/category')
const Position = require('../models/position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try{
        const categories = await Category.find({user: req.user.id})
        res.status(200).json(categories)
    }catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try{
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    }catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try{
        await Category.remove({_id: req.params.id})
        await Position.remove({category: req.params.id})
        res.status(200).json('category and related positions removed')
    }catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try{
        const category = await new Category({
            name: req.body.name,
            imageSrc: req.body.imageSrc,
            user: req.user.id //comes from passport
        }).save()
        res.status(200).json(category)
    }catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try{
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(category)
    }catch (e) {
        errorHandler(res, e)
    }
}
