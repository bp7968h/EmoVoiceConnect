const config = require('./config')
const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const app = express()

const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/user')
const matchRouter = require('./controllers/match')
const chatRouter = require('./controllers/chat')
const uploadRouter = require('./controllers/upload');

const tokenExtractor = require('./middlewares/tokenExtractor')
const userExtractor = require('./middlewares/userExtractor')
const unknownEndPoint = require('./middlewares/unknownEndPoint')
const errorHandler = require('./middlewares/errorHandler')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI).then(() => {
    logger.info('connected to MongoDB')
}).catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
})

app.use(cors())
app.use(express.json())

app.use('/api/auth', loginRouter)
app.use('/api/user', userRouter)
app.use('/api/match', tokenExtractor, userExtractor, matchRouter)
app.use('/api/chat', tokenExtractor, userExtractor, chatRouter)
app.use('/api/uploads', tokenExtractor, uploadRouter);

app.use(unknownEndPoint)
app.use(errorHandler)

module.exports = app