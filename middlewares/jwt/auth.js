
'use strict'

const jwt = require('jsonwebtoken')

const JWTSecret = process.env.JWT_SECRET

module.exports = (req, res, next) => {

            const token = jwt.sign({ "email" : req.body.email }, JWTSecret, {
            
                expiresIn: 60 * 60
            
            })

            res.status(200).send({

                "verified": true,
                "auth": true,
                "token": token

            })

}