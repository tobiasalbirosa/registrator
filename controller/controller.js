const express = require('express')
const controller = express.Router()
const register = require('../routes/register')
const login = require('../routes/login')

controller.use(express.urlencoded({ extended: false }))
controller.use(express.json())

controller.post('/register', (req, res, next) => {
    controller.use(register)
    next()
})
controller.post('/login', (req, res, next) => {
    controller.use(login)
    next()
})
module.exports = controller
