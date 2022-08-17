const PaymentRouter = require("express").Router()
const PaymentController = require("../controllers/payment")


PaymentRouter.post("" ,PaymentController.SelectPayment)



module.exports = PaymentRouter