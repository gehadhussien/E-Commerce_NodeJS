const OrderRouter = require("express").Router()
const OrderController = require("../controllers/orders")
const middleware = require("../util/middlewares")


OrderRouter.post("" ,middleware.checkCustomerAuth , OrderController.addOrder)

OrderRouter.get("" , OrderController.selectMyOrder)


module.exports = OrderRouter