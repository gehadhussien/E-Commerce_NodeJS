const ProductRouter = require("express").Router()
const ProductController = require("../controllers/products")


ProductRouter.get("" ,ProductController.selectProduct)
ProductRouter.get("/search" ,ProductController.selectOne) 
ProductRouter.get("/filter" ,ProductController.filterProducts)

module.exports = ProductRouter