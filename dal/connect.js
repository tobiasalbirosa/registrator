'use strict'

const { MongoClient } = require('mongodb')

const url = process.env('DB_URL')
const client = new MongoClient(url)

const connect = new Promise ((res, err) => {
  
  client.connect().then(() => {
    console.log("connected")
    res(client)
  })
  .catch(err => {
    err(err)
  })

})

module.exports = connect