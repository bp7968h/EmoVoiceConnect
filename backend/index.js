const http = require('http')
const app = require('./app')
const { setupSocket } = require('./socket')
const config = require('./config')
const logger = require('./utils/logger')

const server = http.createServer(app)
setupSocket(server)

server.listen(config.PORT, () => {
    logger.info(`EmoVoiceConnect Backend Listenting on Port ${config.PORT}`)
})
