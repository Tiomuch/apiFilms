const jwt = require("jsonwebtoken")
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["authorization"]

    console.log('token', token)

    if (!token) {
        return res.status(403).send("A token is required for authentication")
    }
    try {
        jwt.verify(token?.split(' ')[1], process.env.TOKEN_KEY)
    } catch (err) {
        return res.status(401).send("Invalid Token")
    }
    return next()
}

module.exports = verifyToken