'use strict'

const checkVerifyUser = (email, password, code,req, res, next) => {
    console.log(" code: " + code)

    if (email != undefined && password != undefined && code != undefined) {
        console.log(" code: " + code)
    }
}
module.exports = checkVerifyUser