'use strict'

const jwt = require('jsonwebtoken')
 
const JWT_SECRET = process.env.JWT_SECRET

const JWT_TYPE = process.env.JWT_TYPE

const JWT_ALG = process.env.JWT_ALG

const ctypto = require('crypto')

module.exports = async (req, res, next) =>  {

    var token = req.headers.authorization

    if (!token) {

        res.status(503).send({ auth: false, message: 'No authorized' })

    }   else {

        let headers = 
        {
            typ : JWT_TYPE,
            alg : JWT_ALG
        }

        headers = JSON.stringify(headers)
        headers = Buffer.from(headers).toString('base64')

    
        
        let t = headers+"."+token


        console.log("TOKEN ON VERIFY JWT ",t)

        jwt.verify(token), JWT_SECRET, (err, verifiedJWT) => {

            if(err){

                res.status(503).send({ auth: false, message: 'No authorized' })

            } else {

                console.log(verifiedJWT)
                return
            
            }
          
        })


    }


}