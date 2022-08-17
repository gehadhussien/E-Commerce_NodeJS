
const PAYMENT = require("../models/payment")
exports.SelectPayment = (request, response) => {
    const knex = request.app.locals.knex
    const quantity = request.body.quantity
    const type = request.body.type
    const country = request.body.country
    //----------------------------------------------------------------//
    const price = request.body.price

    var ShippingCost= 0 
    var Calculateamount= 0

 

    if ( !type || !country || !quantity|| !price ) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

                   if(country == "cairo"){
                        ShippingCost=25
                       
                        Calculateamount = price * quantity + ShippingCost
                      
                     }
        
                    else if(country == "alex"){
                        ShippingCost=50
                        Calculateamount = price * quantity + ShippingCost
                     }
        
                    else {
                        ShippingCost=70
                        Calculateamount =price * quantity + ShippingCost
                     }
        
    
   const Payment = new PAYMENT("1" , type , "1")

    knex("payments")
                
                    .insert({
                        type: Payment.type,
                        amount: Calculateamount, 
                       
                    
                    })
                    .then(data => {
                        return response.status(201).json({
                             status: "ok",
                             msg: "Payment Done"
                         })
                     })
                     .catch(error => {
                         return response.status(500).json({
                             status: "error",
                             msg: "500 Internal Server Error"
                         })
                     })
         
 
}

    













































