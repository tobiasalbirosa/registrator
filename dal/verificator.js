`use strict`

const verificator = (email,  password,  code, req, res, next) => {
    
    //LOGIN CONDITIONS, CHECK IF EMAIL AND PASSWORD ARE NOT EMPTY
    //SECURITY LEVEL: BASIC_LOW_DANGEROUS
    
    if (email != undefined && code != undefined && password != undefined) {

        let connect = require(`./connect`)
        const close = require(`./close`)

        //DB CONNECT:

        connect

            .then(collection => {

                //SUCCESS:

                collection

                    .findOne({ email: email, password : password, code: parseInt(code) })

                        .then(result => {
                            
                            //ON DB RESULT:
                            
                            if (result == null) {
                            
                                res.status(404).send(`This user o password doesn't exists, or code is wrong`)
                            
                            } else {

                                let newCode = Math.floor(Math.random() * (999999 - 100000)) + 100000

                                collection
                                
                                    .updateOne({ email: email, password : password, code: parseInt(code)}, { $set: { verified: true , code: parseInt(newCode) } })
                                    
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

module.exports = verificator