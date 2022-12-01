require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env
// line 3 pulls in the 'SECRET' variable from our .env file

module.exports = {
    isAuthenticated: (req, res, next) => {
        // function takes in our standard req, res, and function 'next' to use after authentication has been checked
        const headerToken = req.get('Authorization')

        if (!headerToken) {         // if the headerToken is not properly authorized, send an error status
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)             // set token equal to the JWT credential (this encodes the headerToken with our SECRET value)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.')       // if the token is bad, create a new error to throw back to the front-end
            error.statusCode = 401
            throw error
        }

        next()
    }
}