const hashSecret = process.env.hashSecret
const hashValidator = require('password-hash-and-salt')

module.exports = (hash) => {
 
        if(!hash) {
    
            return res.status(400).send({
    
                "error": "Please, provide a hash"
    
            })
    
        }
    
        hashValidator(hashSecret).verifyAgainst(hash, (error, verified) => {
    
            if(error) {
    
                return res.status(500).send({
    
                    "error": "Error validating hash"
    
                })
    
            }
    
            if(!verified) {
    
                return res.status(401).send({
    
                    "error": "Invalid hash"
    
                })
    
            }

        })

}