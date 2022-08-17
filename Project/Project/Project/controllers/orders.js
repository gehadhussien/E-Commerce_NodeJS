
const ORDER = require("../models/order")
exports.addOrder = (request, response) => {
    const knex = request.app.locals.knex

    const quantity = request.body.quantity
    const buy_product_id = request.body.buy_product_id
    const payment_id = request.body.payment_id
   


    
    if (!quantity ||  !buy_product_id || !payment_id) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request" 
        })
    }

    // validate the entered product quantity
    var PrductNewQuantity = -1;
    knex.select('quantity')
    .from('products')
    //First() to select only one value which is id 
    .where('id', buy_product_id).first()
        .then(product => {
            if (product.quantity < quantity) {
                return response.status(400).json({
                    status: "error",
                    msg: "400 Bad Reuqest, The requested product quantity is not available \n Max allowed quantity is : { " + product.quantity + " }"
                })
            }
            else {
                PrductNewQuantity = product.quantity - quantity;
                const order = new ORDER('1', quantity, "InCart", payment_id)
 

    knex("orders")

        .insert({
            quantity: order.quantity,
            payment_id: order.payment_id,
            status: order.status,
         
       
        })

        .then(data => {
            knex("products")
            .update({ 
                quantity: PrductNewQuantity 
            })
                .where("id", buy_product_id)
                .then(data=> {
                    return response.status(200).json({
                        status: "ok",
                        msg: "Order Created"
                    })
                }).catch(err=>{
                    console.log("Error");
                });
           
        })
        .catch(error => {
            return response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error" 
            })
        })
            }
        })
        .catch(error => {
            console.log(error);
            return response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error" 
            })
        })

   
}



exports.selectMyOrder= (request,response)=>{

    const knex = request.app.locals.knex

    const code = request.body.code

   


    knex
    .select('buy.code as Buy Code','customers.name as Customer Name','payments.type as Payment Type'  ,'products.name as Products name','products.price as Products Price','orders.quantity as Orders Quantity')
    .from('buy')
    .where('buy.code', '=', code)
    .where('customers.is_deleted','=','0'  )
    .where('products.is_deleted','=','0'  )
    .where('payments.is_deleted','=','0'  )
    .where('orders.is_deleted','=','0'  )


    .innerJoin('customers','buy.customer_id', 'customers.id')    
    .innerJoin('payments','buy.order_payment_id', 'payments.id')    
    .innerJoin('products','buy.product_id', 'products.id')    
    .innerJoin('orders','buy.order_id', 'orders.id')    
      

    
     .then(buy => {
        response.status(200).json(buy)
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({
            status: "error",
            msg: "500 Internal Server Error"
        })
    })

}