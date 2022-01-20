`use strict`

const express = require(`express`)
const login = express.Router()
const checkLogin = require(`../middlewares/checkLogin`)

login.post( `/login` , (req,res,next) => {

    checkLogin( req.body.email, req.body.password, req, res, next)
    
})

module.exports = login