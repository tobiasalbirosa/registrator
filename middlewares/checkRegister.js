`use strict`

const register = require(`../dal/register`)

module.exports = (email, password, confirmpassword, req, res, next) => {
    
    if( email != undefined && password != undefined 
        && confirmpassword != undefined && password == confirmpassword) {

        register(email, password, confirmpassword, req, res, next)

    }

}