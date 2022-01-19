'use strict'

const register = (email, password, confirmpassword, req, res, next) => {
    
    //REGISTRATION CONDITIONS, CHECK IF EMAIL AND PASSWORD ARE NOT EMPTY
    //SECURITY LEVEL: BASIC_LOW_DANGEROUS

    if (email != undefined && password != undefined && confirmpassword != undefined && password == confirmpassword) {
        
        const connect = require('./connect')
        const close = require('./close')
        
        //DB CONECTION:
        connect
            .then(client => {
                //SUCCESS:
                const db = client.db("db")
                const collection = db.collection("users")

                collection.findOne({ email: email })
                    .then(result => {
                        if (result == null) {
                        //USER DOESN'T EXISTS, LETS GO TO ADD USER ->
                            console.log("Trying to insert user")                     
                            collection.insertOne({ email: email, password: password, verified: false })
                                .then(result => {
                                //RESPONSE, USER ADDED:
                                //SEND EMAIL TO USER
                                    console.log("inserted", result)
                                    res.send("User added to database")
                                })
                                .catch(err => {
                                //ERROR RESPONSE, user not added:
                                console.log("error: " + err)
                                res.send("DB Error adding user to database")
                            })

                    } else {
                        //USER EXISTS, TRY ANOTHER EMAIL
                        console.log("User already exists")
                        res.send("User already exists, try another email")
                    }
                })
                .catch(err => {
                    //ERROR RESPONSE, DB ERROR:
                    console.log("Error: " + err)
                })
            //DB CLOSE:
            close()
            })
            .catch(err => {
                console.log(err)
            })
    }
}
module.exports = register