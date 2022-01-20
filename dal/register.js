`use strict`
const sendemail = require(`../nodemailer/sendemail`)
const register = async (email, password, confirmpassword, req, res, next) => {
    
    //REGISTRATION CONDITIONS, CHECK IF EMAIL AND PASSWORD ARE NOT EMPTY
    //SECURITY LEVEL: BASIC_LOW_DANGEROUS
    
    if (email != undefined && password != undefined && confirmpassword != undefined && password == confirmpassword) {
        
        const connect = require(`./connect`)
        const close = require(`./close`)
        
        //DB CONECTION:

        connect
        
            .then(collection => {

                //SUCCESS!:
                
                collection

                    .findOne({ email: email })

                        .then(result => {

                            if (result == null) {

                                //USER DOESN'T EXISTS, LETS GO TO ADD USER ->
                                sendemail(email)
                                res.status(201).send("check mail")
                                return

                                collection

                                    .insertOne({ email: email, password: password, verified: false })
                                
                                        .then(result => {

                                            //RESPONSE, USER ADDED:
                                            //SEND EMAIL TO USER...
                                            
                                            sendemail(email, password, result.insertedId.toString())
                                            res.status(201).send(result)

                                        })
                                        
                                        .catch(err => {

                                            //ERROR RESPONSE, user not added:

                                            res.status(500).send(`DB Error adding user to database `+ err)

                                        })

                            } else {

                                //USER EXISTS, TRY ANOTHER EMAIL

                                res.status(417).send(`User already exists, try another email`)

                            }

                        })

                        .catch(err => {

                            //ERROR RESPONSE, DB ERROR:
                            res.status(404).send(err)

                        })

                //DB CLIENT CLOSE AFTER WORK WITH DB COLLECTION:

                close()

            })

            .catch(err => {

                res.status(404).send(`NODE JS ERROR `+err)

            })

    }

}

module.exports = register