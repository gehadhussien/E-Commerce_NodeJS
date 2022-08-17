const bcrypt = require("bcrypt")
const ADMIN = require("../models/admin")
const jwt = require("jsonwebtoken")
const joi = require("joi")
exports.addAdmin = (request, response) => {
    const knex = request.app.locals.knex

    const name = request.body.name
    const email = request.body.email
    const password = request.body.password

    if (!name || !email || !password) {
        return response.status(400).json({
            status: "error",
            msg: "400 Bad Request"
        })
    }

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            console.log(err);
        }
        const admin = new ADMIN('1', name, email, password, hash)

            //validation

            const AdminSchema = joi.object({
                id: joi.string().not().empty().min(1).max(50).pattern(/[0-9]+/).required() ,
                name :joi.string().not().empty().min(3).max(20).pattern(/[a-z A-Z]{3,20}/).required(),
                email :joi.string().email().min(6).max(60).required(),
                password :joi.string().not().empty().min(6).max(100).required(),
                hashedPassword :joi.string().not().empty().min(1).max(100).required(),

            })
            const joiError = AdminSchema.validate(admin)

            if(joiError.error){
                console.log(joiError.error.details)
                return response.status(400).json({
                    status: "error",
                    msg: "400 bad request"
                })
            }

      
        knex("admins")
            .insert({
                name: admin.name,
                email: admin.email,
                password: admin.hashedPassword,
            })
            .then(data => {
                response.status(201).json({
                    status: "ok",
                    msg: "Created"
                })
            })
            .catch(error => {
                console.log(error);
                response.status(500).json({
                    status: "error",
                    msg: "500 Internal Server Error"
                })
            })



    });


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
  

    knex("admins")
        .select('email', 'password')
        .limit(1)
        .where('email', '=', email)
        .then(admin => {
            console.log(admin);
            if (admin[0] != null) { 
                bcrypt.compare(password, admin[0].password, (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    if (result) {
                        const token = jwt.sign({
                            UserEmail : admin[0].email ,
                            UserType : "Admin" 
                        } , "123456" , {}) 
                       
                        
                        response.status(200).json({
                            status: "ok",
                            msg: "login" ,
                            token : token
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


