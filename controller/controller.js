const express = require('express')
const controller = express.Router()
const register = require('../routes/register')
const login = require('../routes/login')
const verifyUser = require('../routes/verifyUser')

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
controller.post('/verifyUser', (req, res, next) => {
    controller.use(verifyUser)
    next()
})

module.exports = controller
