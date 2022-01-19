'use strict'

const login = (email, password, req, res, next) => {
    
    //LOGIN CONDITIONS, CHECK IF EMAIL AND PASSWORD ARE NOT EMPTY
    //SECURITY LEVEL: BASIC_LOW_DANGEROUS
    
    if (email != undefined && password != undefined) {

        const connect = require('./connect')
        const close = require('./close')

        //DB CONECTION:
        connect
            .then(client => {
                //SUCCESS:
                const db = client.db("db")
                const collection = db.collection("users")

                collection.findOne({ email: email , password: password })
                    .then(result => {
                        if (result == null) {
                        //USER DOESN'T EXISTS, CANT LOGIN
                            console.log("User doesn't exists or password is wrong")
                            res.send("User doesn't exists or password is wrong")
                        } else {
                        //LOGIN SUCCESS
                            console.log("LOGIN SUCCESS")
                            res.send("LOGIN SUCCESS")
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
module.exports = login