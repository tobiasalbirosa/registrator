`use strict`

const register = (email, password, confirmpassword, req, res, next) => {
    
    //REGISTRATION CONDITIONS, CHECK IF EMAIL AND PASSWORD ARE NOT EMPTY
    //SECURITY LEVEL: BASIC_LOW_DANGEROUS

    if (email != undefined && password != undefined && confirmpassword != undefined && password == confirmpassword) {
        
        const connect = require(`./connect`)
        const close = require(`./close`)
        
        //DB CONECTION:

        connect
        
            .then(collection => {

                //SUCCESS:



                collection

                    .findOne({ email: email })

                        .then(result => {

                            if (result == null) {

                            //USER DOESN'T EXISTS, LETS GO TO ADD USER ->
                 
                                collection

                                .insertOne({ email: email, password: password, verified: false })
                                
                                    .then(result => {

                                        //RESPONSE, USER ADDED:
                                        //SEND EMAIL TO USER...
                                        res.status(201).send(result)

                                    })
                                    .catch(err => {

                                        //ERROR RESPONSE, user not added:
                                        res.send(`DB Error adding user to database`, err)

                                    })

                            } else {

                                //USER EXISTS, TRY ANOTHER EMAIL
                                res.send(`User already exists, try another email`)

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
module.exports = register