`use strict`

const express = require(`express`)
const login = express.Router()

login.post(`/login`, (req,res,next) => {
    const checkLogin = require(`../middlewares/checkLogin`).default
    checkLogin(req.body.email, req.body.password, req, res, next)
})

module.exports = login
