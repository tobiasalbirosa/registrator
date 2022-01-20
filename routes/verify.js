`use strict`

const express = require(`express`)
const verify = express.Router()
const checkVerify = require(`../middlewares/checkVerify`)

verify.post( `/verify` , (req,res,next) => {

    checkVerify(req.body.email, req.body.password, req.body.code, req, res, next)

})

module.exports = verify