'use strict'

const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
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