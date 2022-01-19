'use strict'

const express = require('express')

const verifyUser = express.Router()
const checkVerifyUser = require('../middlewares/checkVerifyUser')

verifyUser.post('/verifyUser', (req,res,next) => {
    checkVerifyUser(req.body.email, req.body.password, req.body.verifyCode ,req, res, next)
})

module.exports = verifyUser
