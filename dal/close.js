`use strict`

const { MongoClient } = require(`mongodb`)
const url = process.env.DB_URL
const client = new MongoClient(url)

const close = () => {
  
    client.close()

}

module.exports = close