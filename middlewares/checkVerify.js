`use strict`

const verificator = require(`../dal/verificator`)

const checkVerify = (email, password, code,req, res, next) => {

    console.log(`code: ` + code)

    if (email != undefined && password != undefined && code != undefined) {
        verificator(email, password, code, req, res, next)
    }
    
}

module.exports = checkVerify