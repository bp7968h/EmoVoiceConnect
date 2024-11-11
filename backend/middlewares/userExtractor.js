const config = require('../config')
const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {
    const decodedToken = jwt.verify(request.token, config.JWT_SEC)
    // console.log(decodedToken)
    if (!decodedToken.id && !decodedToken.email) {
        return response.status(401).json({ message: 'Token Authentication Failed, Login Again' })
    }
    request.user = {
        id: decodedToken.id,
        email: decodedToken.email
    }
    console.log('User Extracted: ', request.user)
    next()
}

module.exports = userExtractor