
`use strict`
require(`dotenv`).config()

const express = require(`express`)
const server = express()
const PORT = process.env.PORT
const HOST = process.env.HOST

const controller = require(`./controller/controller`)

server.use(controller)

server.listen(PORT, HOST, () => { 
    console.log(`Server running at http://${HOST}:${PORT}/`)
})