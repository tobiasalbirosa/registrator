`use strict`

const login = (email, password, req, res, next) => {
    
    //LOGIN CONDITIONS, CHECK IF EMAIL AND PASSWORD ARE NOT EMPTY
    //SECURITY LEVEL: BASIC_LOW_DANGEROUS
    
    if (email != undefined && password != undefined) {

        const connect = require(`./connect`)
        const close = require(`./close`)

        //DB CONECTION:

        connect

            .then(collection => {

                //SUCCESS, DB CONNECTED AND OUR CLIENT DATA:
                


                collection.findOne({ email: email , password: password })

                    .then(result => {
                
                        if (result == null) {

                            //USER DOESN'T EXISTS, CANT LOGIN
                            res.status(404).send(`User doesn't exists or password is wrong`)
                            
                        } else {

                            //LOGIN SUCCESS
                            res.status(200).send(result)
                        
                        }
                
                    })

                    .catch(err => {

                        //ERROR RESPONSE, DB ERROR:
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

module.exports = login