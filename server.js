`use strict`

require(`dotenv`).config()

const express = require(`express`)
const server = express()
const PORT = process.env.PORT
const HOST = process.env.HOST
const controller = require(`./controller/controller`)

//Security modules:

const mongoSanitize = require(`express-mongo-sanitize`)
const helmet = require(`helmet`)
const hpp = require(`hpp`)
const xssClean = require(`xss-clean`)
const rateLimit = require(`express-rate-limit`)
const cors = require(`cors`)

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
}) 

//SECURITY LAYER: 
server.use(mongoSanitize(), helmet(), hpp(), xssClean(), cors(), limiter)

//ROUTES:
server.use(controller).listen(PORT, HOST, () => {
    
    console.log( `Server running at http://`+HOST+`:`+PORT+`/` )

})