`use strict`

const register = require(`../dal/register`)

const checkRegister = (email, password, confirmpassword, req, res, next) => {

    if (email != undefined && password != undefined && confirmpassword != undefined 
        && password == confirmpassword) {

        register(email, password, confirmpassword, req, res, next)

    }
}
module.exports = checkRegister