`use strict`

const { MongoClient } = require(`mongodb`)
const url = process.env.DB_URL
const client = new MongoClient(url)

const connect = new Promise ((res, err) => {

  client
    
    .connect()
    
      .then(() => {

        const db = client.db(process.env.USERS_DB)
        const collection = db.collection(process.env.USERS_DB_COLLECTION)

        res(collection)
  
      })
      
      .catch(err => {
  
        err(err)
  
      })

})

module.exports = connect