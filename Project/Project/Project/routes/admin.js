const adminRouter = require("express").Router()
const adminController = require("../controllers/admin")
const productController = require("../controllers/products")
const middleware = require("../util/middlewares")

adminRouter.post("/",adminController.addAdmin)
adminRouter.post("/login",adminController.login)

adminRouter.post("/add", middleware.checkAdminAuth,productController.addProduct)
adminRouter.put("/:id",middleware.checkAdminAuth,productController.updateProduct)
adminRouter.delete("/:id", middleware.checkAdminAuth, productController.deleteProduct)
adminRouter.patch("/:id", middleware.checkAdminAuth,productController.restoreProduct)



module.exports = adminRouter