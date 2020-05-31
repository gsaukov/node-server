const Order = require('../models/order')
const errorHandler = require('../utils/errorHandler')

// (get) localhost:5000/api/order?offset=2&limit=5
module.exports.getAll = async function (req, res) {
    try{
        const query = {
            user: req.user.id,
        }
        if (req.query.start){
            query.date = {$gte: req.query.start} //greater or equal
        }
        if (req.query.end){
            if(!query.date) {
                query.date = {}
            }
            query.date['$lte'] = req.query.end //less or equal
        }
        if (req.query.order){
            query.order = +req.query.order
        }
        const orders = await Order.find(query)
            .sort({date: -1}) //date descending
            .skip(+req.query.offset) //number of elements '+' casting to number
            .limit(+req.query.limit) //number of elements '+' casting to number
        res.status(200).json(orders)
    }catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try{
        const lastOrder = await Order.findOne({user: req.user.id}).sort({date: -1}) //date descending
        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save()
        res.status(200).json(order)
    }catch (e) {
        errorHandler(res, e)
    }
}
