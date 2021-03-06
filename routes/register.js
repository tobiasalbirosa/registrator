`use strict`

const express = require(`express`)
const register = express.Router()
const checkRegister = require(`../middlewares/checkRegister`)

register.post( `/register`, (req, res, next) => {
    
    checkRegister(req.body.email, req.body.password, req.body.confirmpassword, req, res, next)

})

module.exports = register