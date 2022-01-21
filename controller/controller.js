`use strict`

const express = require(`express`)
const controller = express.Router()
const register = require(`../routes/register`)
const login = require(`../routes/login`)
const logout = require(`../routes/logout`)
const verify = require(`../routes/verify`)

controller.use(express.urlencoded({ extended: false }))
controller.use(express.json())

controller.post( `/register` , (req, res, next) => {

    controller.use( register )
    
    next()

})

controller.post( `/login` , (req, res, next) => {

    controller.use( login )

    next()

})

controller.post( `/verify` , (req, res, next) => {

    controller.use( verify )

    next()

})

controller.post( `/logout` , (req, res, next) => {

    controller.use( logout )

    next()

})

module.exports = controller