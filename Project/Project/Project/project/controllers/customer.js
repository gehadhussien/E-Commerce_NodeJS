const bcrypt = require("bcrypt")
const CUSTOMER = require("../models/customer")
const jwt = require('jsonwebtoken');
const joi = require("joi")
exports.addCustomer = (request, response) => {
    const knex = request.app.locals.knex

    const name = request.body.name
    const email = request.body.email
    const address = request.body.address
    const phone = request.body.phone
    const country = request.body.country
    const password = request.body.password
  

    if (!name || !email || !address || !phone ||!country || !password ) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

  
            
            const customer = new CUSTOMER('1', name, email,address,phone ,country, password, "123")

            //validation

            const CustomerSchema = joi.object({
                id: joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required() ,
                name :joi.string().not().empty().min(3).max(20).pattern(/[a-z A-Z]{3,20}/).required(),
                email :joi.string().email().min(6).max(60).required(),
                address :joi.string().not().empty().min(10).max(100).pattern(/[a-z A-Z]/).required(),
                phone : joi.string().not().empty().min(1).max(20).pattern(/[0-9]{11}/).required(),
                country :joi.string().not().empty().min(4).max(20).pattern(/[a-z A-Z]{4,20}/).required(),
                password :joi.string().not().empty().min(6).max(100).required(),
                hashedPassword :joi.string().not().empty().min(1).max(5).required(),

            })
            const joiError = CustomerSchema.validate(customer)

            if(joiError.error){
                console.log(joiError.error.details)
                return response.status(400).json({
                    status: "error",
                    msg: "400 bad request"
                })
            }

            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    console.log(err);
                    return response.status(500).json({
                        status: "error",
                        msg: "500 Internal Server Error"
                    })
                }
              
        
                customer.hashedPassword = hash
                knex("customers")
                    .insert({
                        name: customer.name,
                        email: customer.email,
                        address: customer.address,
                        phone: customer.phone,
                        country: customer.country,
                        password: customer.hashedPassword,
                    })
                    .then(data => {
                       return response.status(201).json({
                            status: "ok",
                            msg: "Created"
                        })
                    })
                    .catch(error => {
                        return response.status(400).json({
                            status: "error",
                            msg: "400 Internal Server Error"
                        })
                    })
        
        
        
            })
      //  }

    //})




}

exports.login = (request, response) => {

    const knex = request.app.locals.knex

    const email = request.body.email
    const password = request.body.password
    if (!email || !password) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    knex("customers")
        .select('email', 'password')
        .limit(1)
        .where('email', '=', email)
        .then(customer => {
            console.log(customer);
            if (customer[0] != null) {
                bcrypt.compare(password, customer[0].password, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    if (result) {

                        const token = jwt.sign({
                            userEmail:customer[0].email,
                            userType: 'CUSTOMER'
                        }, "12345", {})

                        response.status(200).json({
                            token: token,
                            status: "ok",
                            msg: "login"
                        })
                    } else {
                        response.status(401).json({
                            status: "error",
                            msg: "invalid password"
                        })
                    }
                })

            } else {
                response.status(401).json({
                    status: "error",
                    msg: "401 not Auth"
                })
            }
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}