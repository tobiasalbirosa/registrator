'use strict'

const jwt = require('jsonwebtoken')
 
const secret = process.env.SECRET

module.exports = async (req, res, next) =>  {

    const hashedToken = req.body.token
 
    if (!token) {

        res.status(401).send({ auth: false, message: 'No authorized' })

    }   else {

        jwt.verify(token, secret, (err, verifiedJWT) => {

            if(err){

              res.send(err.message)

            } else {
            
                req.body.token = verifiedJWT
    
                next()
            
            }
          
        })


    }


}