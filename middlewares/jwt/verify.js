'use strict'

const jwt = require('jsonwebtoken')
 
const JWT_SECRET = process.env.JWT_SECRET

const JWT_TYPE = process.env.JWT_TYPE

const JWT_ALG = process.env.JWT_ALG

module.exports = async (req, res, next) =>  {

    var token = req.headers.authorization

    if (!token) {

        res.status(503).send({ auth: false, message: 'No authorized' })

    }   else {

        let headers = {
            "alg": JWT_ALG,
            "typ": JWT_TYPE
        }

        //ENCODE HEADERS TO COMPLETE THE JWT 

        let bs64encode = (data)  => {
            if (typeof data === "object") {
              data = JSON.stringify(data)

            }
            return Buffer.from(data).toString("base64url")
        }
          
        let bs64header = bs64encode(headers)  
        
        let completedToken =  bs64header+"."+token

        jwt.verify(completedToken, JWT_SECRET, (err, verifiedJWT) => {
          
            if(err){
                console.log("ERROR")
                console.log(err)
                res.status(503).send({ auth: false, message: 'No authorized' })

            } else {

                res.status(200).send({ auth: true, message: 'Your session is now validated' })
            
            }
          
        })

    }

}