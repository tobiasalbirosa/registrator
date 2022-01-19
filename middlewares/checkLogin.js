'use strict'

const login = require('../dal/login')

const checkLogin = (email, password, req, res, next) => {
    if (email != undefined && password != undefined) {
        login(email, password, req, res, next)
    }
}

module.exports = checkLogin