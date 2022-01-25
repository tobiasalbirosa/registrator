`use strict`

const express = require(`express`)
const logout = express.Router()

const verify = require(`../middlewares/jwt/verify`)

logout.post( `/logout`, verify, (req, res, next) => {

    res.status(200).send({ auth: false, message: 'Logged out' })

})

module.exports = logout