const product = require("../models/product") 
//products details
exports.selectProduct = (request, response) => {

    const knex = request.app.locals.knex
    knex("products")
        .select('name','price')
        .where("is_deleted",'=','0')
        .then(product => {
            response.status(200).json(product)
        })
        .catch(error => {
            console.log(error);
        })
}




//search
exports.selectOne = (request, response) => {
    const knex = request.app.locals.knex

    knex("products")
        .select(['name','price' , 'quantity'])
        .where('name', '=', `${request.body.name}`)
        .limit(1)
        .then(product => {
            return response.status(200).json(product)
        })
        .catch(error => {
            console.log(error);
            return response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}


//filtering
exports.filterProducts = (request, response) => {
    const knex = request.app.locals.knex

    knex("products")
        .select(['name','price' , 'quantity'])
        .where('price', '<=', `${request.body.price}`)
        .then(product => {
            return response.status(200).json(product)
        })
        .catch(error => {
            console.log(error);
            return response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}



//update
exports.updateProduct = (request, response) => {
    const knex = request.app.locals.knex

    const name = request.body.name
    const price = request.body.price
    const quantity = request.body.quantity
    const id = request.params.id


   if(!name || !price || !quantity || !id){
       return  response.status(400).json({
        status: "Error",
        msg: "400 Bad Request"
    })
   }
   const Product = new product(id, name ,price , quantity)
    knex('products')
        .where('id', '=', Product.id)
        .update({
               name: Product.name,
               price:Product.price,
               quantity: Product.quantity,
        })
        .then(data => {
            response.status(200).json({
                status: "ok",
                msg: "updated"
            })
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                status: "Error" ,
                msg : "500 Internal server error"
            })
        })

}


exports.deleteProduct = (request, response) => {
    const knex = request.app.locals.knex

     knex('products')
        .where('id', '=', request.params.id)
        .update({
            is_deleted: '1',
        })
        .then(data => {
            response.status(200).json({
                status: "ok",
                msg: "deleted"
            })
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                status: "Error" ,
                msg : "500 Internal server error"
            })
        })
}

exports.restoreProduct = (request, response) => {
    const knex = request.app.locals.knex

     knex('products')
        .where('id', '=', request.params.id)
        .update({
            is_deleted: '0',
        })
        .then(data => {
            response.status(200).json({
                status: "ok",
                msg: "restored"
            })
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                status: "Error" ,
                msg : "500 Internal server error"
            })
        })
}