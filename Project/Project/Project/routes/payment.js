const PaymentRouter = require("express").Router()
const PaymentController = require("../controllers/payment")
const middleware = require("../util/middlewares")


PaymentRouter.post("" ,middleware.checkCustomerAuth , PaymentController.SelectPayment)



module.exports = PaymentRouter