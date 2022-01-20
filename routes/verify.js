`use strict`

const express = require(`express`)
const verify = express.Router()
const checkVerifyUser = require(`../middlewares/checkVerify`)

verify.post(`/verify`, (req,res,next) => {

    checkVerifyUser(req.body.email, req.body.password, req.body.verifyCode, req, res, next)
    
})

module.exports = verify
