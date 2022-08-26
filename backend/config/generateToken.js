const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return  jwt.sign({id}, "123456789", {
        expiresIn:"1d"
    })
    
}

module.exports=generateToken