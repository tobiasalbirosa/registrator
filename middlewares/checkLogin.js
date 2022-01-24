`use strict`

const login = require(`../dal/login`)

module.exports = (email, password, req, res, next) => {   
    
    if  (email != undefined && password != undefined) {
    
            login(email, password, req, res, next)
    
    }

}