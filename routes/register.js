`use strict`

const express = require(`express`)
const register = express.Router()

register.post(`/register`, (req, res, next) => {
    
    const checkRegister = require(`../middlewares/checkRegister`)
    checkRegister(req.body.email, req.body.password, req.body.confirmpassword, req, res, next)

})

module.exports = register