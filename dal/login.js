`use strict`

module.exports = (email, password, req, res, next) => {
    
    //LOGIN CONDITIONS, CHECK IF EMAIL AND PASSWORD ARE NOT EMPTY
    //SECURITY LEVEL: MEDIUM
    

    if (email != undefined && password != undefined) {

        const connect = require(`./connect`)
        const close = require(`./close`)
        const auth = require(`../middlewares/jwt/auth`)
        const crypto = require('crypto')
        const secret = process.env.HASH_SECRET
        const algorithm = process.env.HASH_ALGORITHM

        //DB CONECTION:

        connect

            .then(collection => {

                //SUCCESS, DB CONNECTED AND OUR CLIENT DATA:
                email = email.toString()

                const hashedEmail = crypto.createHash(algorithm, secret)
                .update(email)
                .digest('hex')

                password = password.toString()

                const hashedPass = crypto.createHash(algorithm, secret)
                .update(password)
                .digest('hex')
            
                collection.findOne({ email: hashedEmail , password: hashedPass }).then(result => {

                            if (result == null) {

                                //USER DOESN'T EXISTS, CANT LOGIN

                                res.status(404).send(`User doesn't exists or password is wrong`)
                            
                            } else {

                                //LOGIN SUCCESS
                                //let hashedBoolean = result.verified
                                let isVerified = true
                                isVerified = isVerified.toString()

                                let hashedBoolean = crypto.createHash(algorithm, secret)
                                .update(isVerified)
                                .digest('hex')


                                if(result.verified == hashedBoolean){

                                    auth(req, res, result.id , next)

                                } else {

                                    res.status(503).send({verified : false})
                                
                                }
                        
                            }
                
                        })

                        .catch(err => {

                            //ERROR RESPONSE, DB->COLLECTION ERROR:
                            
                            res.status(404).send(err)

                        })

                //DB CLOSE:

                close()

            })

            .catch(err => {

                //ERROR RESPONSE, DB->COLLECTION ERROR:
                res.status(404).send(err)

            })

    }

}
