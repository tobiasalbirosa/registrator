
'use strict'

const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

const auth = (req, res, next) => {

            const token = jwt.sign({ "email" : req.body.email }, secret, {
            
                expiresIn: 60 * 60
            
            })

            res.status(200).send({

                "email": req.body.email,
                "verified": true,
                "auth": true,
                "token": token

            })

}

module.exports = auth