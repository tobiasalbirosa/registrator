'use strict'
const express = require('express')
const server = express()
const controller = require('./controller/controller')
const PORT = process.env.PORT || 5000
const HOST = process.env.HOST ||  "192.168.1.193"

server.use(controller)

server.listen(PORT, HOST, () => { 
    console.log('Server listen on: ' + HOST  + ':' + PORT) 
})