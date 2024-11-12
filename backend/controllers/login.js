const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const LoginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../config')

LoginRouter.post('/', async (request, response, next) => {
    try {
        const { email, password } = request.body
        const user = await User.findOne({ email })
        const isPasswordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

        if (!(user && isPasswordCorrect)) {
            return response.status(401).json({ message: 'Invalid Credentials, Please Try Again!' })
        }
        
        const rawToken = {
            email: user.email,
            id: user.id,
        }
        const token = jwt.sign(rawToken, config.JWT_SEC)
        response.status(200).send({ token, message: 'Logged In Successfully' })
    } catch (error) {
        next(error)
    }
})

module.exports = LoginRouter