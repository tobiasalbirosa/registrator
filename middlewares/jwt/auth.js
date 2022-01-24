
'use strict'

const jwt = require('jsonwebtoken')

const secret = process.env.HASH_SECRET
const JWTSecret = process.env.JWT_SECRET

const crypto = require('crypto')


module.exports = (req, res, next) => {



            const hashedEmail = crypto.createHash(algorithm, secret)
            .update(email)
            .digest('hex')
            console.log(hashedEmail)

            const token = jwt.sign({ "email" : hashedEmail }, JWTSecret, {
            
                expiresIn: 60 * 60
            
            })


            const hashedToken = crypto.createHash(algorithm, secret)
            .update(token)
            .digest('hex')
            console.log(hashedEmail)

            res.status(200).send({

                "email": hashedEmail,
                "verified": true,
                "auth": true,
                "token": hashedToken

            })

}