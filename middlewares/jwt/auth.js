
'use strict'

const jwt = require('jsonwebtoken')

const JWTSecret = process.env.JWT_SECRET
const JWT_TYPE = process.env.JWT_TYPE
const JWT_ALG = process.env.JWT_ALG

module.exports = (req, res, id ) => {

    const token = jwt.sign({ id }, JWTSecret, { algorithm: JWT_ALG} , { type : JWT_TYPE} , {  expiresIn: 60 * 60 }) 




            const tokenDecodablePart = token.split('.')[1];
            const tokenSignature = token.split('.')[2];

            console.log(token)

            let authData = tokenDecodablePart +"."+ tokenSignature

            res.header("Authorization", authData)

            res.status(200).send({ auth: true, message : "You're logged in" })

}