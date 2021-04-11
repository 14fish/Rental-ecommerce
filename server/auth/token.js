require('dotenv').config()
const jwt = require('jsonwebtoken')

function signToken(userid){
    return jwt.sign({userid}, process.env.JWT_KEY, { expiresIn: '3600s' })
}

function authenticate(req, res, next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({code: 'Access Denied'})

    try{
        req.user = jwt.verify(token, process.env.JWT_KEY);
        next()
    }
    catch (err) {
        res.status(400).json({code: err})
    }

}

module.exports = {signToken, authenticate}