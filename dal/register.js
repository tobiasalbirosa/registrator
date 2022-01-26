`use strict`

const sendemail = require(`../nodemailer/sendemail`)
const crypto = require(`crypto`)
const algorithm = process.env.HASH_ALGORITHM
const secret = process.env.HASH_SECRET
const emailValidator = require(`email-validator`)
const passwordValidator = require('password-validator')
var schema = new passwordValidator()
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = async (email, password, confirmpassword, req, res, next) => {
    
    //REGISTRATION CONDITIONS, CHECK IF EMAIL AND PASSWORD ARE NOT EMPTY
    //SECURITY LEVEL: LOW
   
    if (emailValidator.validate(email) && schema.validate(password) && schema.validate(confirmpassword) && password != undefined && confirmpassword != undefined && password == confirmpassword) {

        const connect = require(`./connect`)
        const close = require(`./close`)
        
        //DB CONECTION:

        connect

            .then(collection => {

                //SUCCESS!:
                const hashedEmail = crypto.createHash(algorithm, secret)
                .update(email)
                .digest(`hex`)

                
                //GO TO FIND THIS EMAIL IN OUR DATABASE: 

                collection

                    .findOne({ email: hashedEmail })

                        .then(result => {

                            if (result == null) {

                                //USER DOESN'T EXISTS, LETS GO TO ADD USER INTO CORRESPONDING COLLECTION ->    
                                
                                
                                const id = crypto.randomBytes(16).toString(`hex`)

                                let code = Math.floor(Math.random() * (999999 - 100000)) + 100000
                                code = code.toString()

                                const hashedPass = crypto.createHash(algorithm, secret)
                                .update(password)
                                .digest(`hex`)

                                const hashedCode = crypto.createHash(algorithm, secret)
                                .update(code)
                                .digest(`hex`)   

                                let isVerified = false
                                isVerified = isVerified.toString()
                                
                                const hashedBoolean = crypto.createHash(algorithm, secret)
                                .update(isVerified)
                                .digest(`hex`)   
                                collection

                                    .insertOne({"id" : id,"email": hashedEmail, "password": hashedPass, "verified": hashedBoolean, "code" : hashedCode })
                                
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

    }else{
        res.status(503).send(`Email or password format is not valid, the minimum length is 8, the maximum length is 100, must have uppercase letters, lowercase letters, some digits and spaces are not allowed`)

    }

}