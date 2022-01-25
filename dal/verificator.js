`use strict`

module.exports = (email,  password,  code, req, res, next) => {
    
    //LOGIN CONDITIONS, CHECK IF EMAIL AND PASSWORD ARE NOT EMPTY
    //SECURITY LEVEL: MEDIUM
    
    if (email != undefined && code != undefined && password != undefined) {

        let connect = require(`./connect`)

        let close = require(`./close`)
        let crypto = require('crypto')
        
        const secret = process.env.HASH_SECRET
        const algorithm = process.env.HASH_ALGORITHM

        //DB CONNECT:

        connect

            .then(collection => {

                //SUCCESS:
                const hashedEmail = crypto.createHash(algorithm, secret)
                .update(email)
                .digest('hex')
                
                const hashedPass = crypto.createHash(algorithm, secret)
                .update(password)
                .digest('hex')

                code = code.toString()

                const hashedCode = crypto.createHash(algorithm, secret)
                .update(code)
                .digest('hex')

                let isVerfied = true
                isVerfied = isVerfied.toString()

                const hashedVerified = crypto.createHash(algorithm, secret)
                .update(isVerfied)
                .digest('hex')

                collection

                    .findOne({ email: hashedEmail, password : hashedPass, code: hashedCode })

                        .then(result => {
                            //ON DB RESULT:
                            
                            if (result == null) {

                                res.status(404).send(`This user o password doesn't exists, or code is wrong`)
                            
                            } else {

                                collection
                                
                                    .updateOne({ email: hashedEmail, password : hashedPass, code: hashedCode}, { $set: { verified: hashedVerified } })
                                    
                                        .then(_result => {

                                            res.status(200).send("Your email is now verified")

                                        })

                                        .catch(err => {

                                            res.status(500).send(`DB Error updating user to database `+ err)

                                        })
                                        
                            }

                        })

                        .catch(err => {
                            
                            res.status(404).send(err)

                        })

                //DB CLOSE:
                close()
            
            })
            
            .catch(err => {

                res.status(404).send(err)
            
            })
    
    }

}