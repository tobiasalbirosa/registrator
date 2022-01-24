`use strict`

const { MongoClient } = require(`mongodb`)
const url = process.env.DB_URL
const client = new MongoClient(url)

module.exports =  () => {
  
    client.close()

}