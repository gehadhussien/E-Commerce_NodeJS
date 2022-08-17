const OrderRouter = require("express").Router()
const OrderController = require("../controllers/orders")


OrderRouter.post("" ,OrderController.addOrder)



module.exports = OrderRouter