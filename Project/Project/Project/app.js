const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const bodyPareser = require("body-parser")
const conn = require("./db/connection")


const adminRouter = require("./routes/admin")
const customerRouter = require("./routes/customer")
const ProductRouter = require("./routes/product")
const OrderRouter = require("./routes/order")
const PaymentRouter = require("./routes/payment")

app.use(morgan("dev"))
app.use(cors())
app.use(bodyPareser.urlencoded({
    extended: false
}))
app.use(bodyPareser.json())


// open database conn
const knex = conn.openConnection()
app.locals.knex = knex


// routes

app.use("/admin",adminRouter)
app.use("/customer",customerRouter)
app.use("/product",ProductRouter)
app.use("/order",OrderRouter)
app.use("/payment",PaymentRouter)

app.use((req, res, next) => {

    const error = new Error("Page not Found")
    error.status = 404
    next(error)
})


app.use((error, req, res, next) => {
    if (error.status == 404) {
        res.status(404).json({
            status: "error",
            msg: "Page not Found"
        })
    }
    else{
        res.status(500).json({
            status: "error",
            msg: "500 Internal server error"
        })
    }
})


module.exports = app