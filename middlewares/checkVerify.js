`use strict`

const verificator = require(`../dal/verificator`)

const checkVerify = (email, password, code, req, res, next) => {


    if (email != undefined && password != undefined 
        && code != undefined) {

        verificator(email, password, code, req, res, next)
    
    }
    
}

module.exports = checkVerify