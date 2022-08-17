const customerRouter = require("express").Router()
const customerController = require("../controllers/customer")
const middlewares = require("../util/middlewares")

customerRouter.post("" , middlewares.checkAdminAuth , customerController.addCustomer)
customerRouter.post("/login",customerController.login)



module.exports = customerRouter