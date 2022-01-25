'use strict'

const jwt = require('jsonwebtoken')
 
const JWT_SECRET = process.env.JWT_SECRET

module.exports = async (req, res, next) =>  {
 
    if (!token) {

        res.status(401).send({ auth: false, message: 'No authorized' })

    }   else {

        jwt.verify(token, JWT_SECRET, (err, verifiedJWT) => {

            if(err){

              res.send(err.message)

            } else {
            
                req.body.token = verifiedJWT
    
                next()
            
            }
          
        })


    }


}