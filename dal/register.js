`use strict`

const sendemail = require(`../nodemailer/sendemail`)

var crypto = require('crypto')


const algorithm = process.env.HASH_ALGORITHM
const secret = process.env.HASH_SECRET

module.exports = async (email, password, confirmpassword, req, res, next) => {
    
    //REGISTRATION CONDITIONS, CHECK IF EMAIL AND PASSWORD ARE NOT EMPTY
    //SECURITY LEVEL: BASIC_LOW_DANGEROUS
    
    if (email != undefined && password != undefined && confirmpassword != undefined && password == confirmpassword) {
        
        const connect = require(`./connect`)
        const close = require(`./close`)
        
        //DB CONECTION:
        console.log(email)

        connect
        
            .then(collection => {
                console.log(email)

                //SUCCESS!:
                const hashedEmail = crypto.createHash(algorithm, secret)
                .update(email)
                .digest('hex')

                console.log(hashedEmail)
                collection

                    .findOne({ email: hashedEmail })

                        .then(result => {

                            if (result == null) {

                                //USER DOESN'T EXISTS, LETS GO TO ADD USER INTO CORRESPONDING COLLECTION ->                             
                                let code = Math.floor(Math.random() * (999999 - 100000)) + 100000

                                const hashedPass = crypto.createHash(algorithm, secret)
                                .update(password)
                                .digest('hex')
                                
                                const hashedBoolean = crypto.createHash(algorithm, secret)
                                .update(true)
                                .digest('hex')   

                                const hashedCode = crypto.createHash(algorithm, secret)
                                .update(code.toString())
                                .digest('hex')   

                                collection

                                    .insertOne({ "email": hashedEmail, "password": hashedPass, "verified": hashedBoolean, "code" : hashedCode})
                                
                                        .then(result => {

                                            //RESPONSE, USER ADDED:
                                            //SEND EMAIL TO USER...

                                            sendemail(email, code)
                                            
                                            res.status(201).send(`Check registered e-mail to complete your registration`)

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