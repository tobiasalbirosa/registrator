`use strict`

const verificator = (email, password, req, res, next) => {
    
    //LOGIN CONDITIONS, CHECK IF EMAIL AND PASSWORD ARE NOT EMPTY
    //SECURITY LEVEL: BASIC_LOW_DANGEROUS
    
    if (email != undefined && password != undefined) {

        let connect = require(`./connect`)
        const close = require(`./close`)

        //DB CONNECT:
        connect
            .then(collection => {

                //SUCCESS:

                collection

                    .findOne({ email: email , password: password })

                        .then(result => {
                            //ON DB RESULT:
                            if (result == null) {
                                //USER DOESN'T EXISTS, CANT LOGIN
                                console.log(`User doesn't exists or password is wrong`)
                                res.status(404).send(`User doesn't exists or password is wrong`)
                            } else {
                                //LOGIN SUCCESS
                                console.log(`LOGIN SUCCESS`)
                                res.status(200).send(result)
                            }

                        })
                        .catch(err => {
                            //ON DB ERROR:
                            console.log(`Error: ` + err)
                            res.status(404).send(err)

                        })
                        //DB CLOSE:
                        close()
            })
            .catch(err => {
                console.log(err)
                res.status(404).send(err)
            })
    }
}
module.exports = verificator