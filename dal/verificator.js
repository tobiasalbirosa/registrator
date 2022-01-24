`use strict`

module.exports = (email,  password,  code, req, res, next) => {
    
    //LOGIN CONDITIONS, CHECK IF EMAIL AND PASSWORD ARE NOT EMPTY
    //SECURITY LEVEL: BASIC_LOW_DANGEROUS
    
    if (email != undefined && code != undefined && password != undefined) {

        let connect = require(`./connect`)
        const close = require(`./close`)
        const crypto = require('crypto')
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

                const hashedCode = crypto.createHash(algorithm, secret)
                .update(code)
                .digest('hex')

                const hashedVerified = crypto.createHash(algorithm, secret)
                .update('true')
                .digest('hex')

                collection

                    .findOne({ email: hashedEmail, password : hashedPass, code: hashedCode })

                        .then(result => {
                                console.log(result)
                            //ON DB RESULT:
                            
                            if (result == null) {
                            
                                res.status(404).send(`This user o password doesn't exists, or code is wrong`)
                            
                            } else {

                                let newCode = Math.floor(Math.random() * (999999 - 100000)) + 100000

                                const newCodeHashed = crypto.createHash(algorithm, secret)
                                hashedEmail.update(newCode)
                                hashedEmail.digest('hex')


                                    console.log(newCode)
                                collection
                                
                                    .updateOne({ email: hashedEmail, password : hashedPass, code: hashedCode}, { $set: { verified: hashedVerified , code: newCodeHashed } })
                                    
                                        .then(_result => {

                                            res.status(200).send({"email" :  result.email, "verfied" : true})

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