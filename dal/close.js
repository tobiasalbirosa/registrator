'use strict'

'use strict'

const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

const close = () => {
  
    client.close()
    console.log("client closed")

}


module.exports = close