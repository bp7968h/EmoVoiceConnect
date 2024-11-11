// socket.js
const { Server } = require("socket.io")
const Chat = require('./models/chat')

const connectedUsers = new Map()
let io = null

const setupSocket = (server) => {
    io = new Server(server, { cors: { origin: "*" } });

    io.use((socket, next) => {
        const { userId } = socket.handshake.query
        if (userId) {
            socket.userId = userId
            connectedUsers.set(userId, socket.id)
        }
        next()
    })

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.userId}`)

        socket.on('send_message', async (data) => {
            console.log(`Message from ${socket.userId}: ${JSON.stringify(data)}`)
            const receiverSocketId = connectedUsers.get(data.receiver)
            if (receiverSocketId) {
                console.log('Inside the condition', receiverSocketId)
                io.to(receiverSocketId).emit('receive_message', data)

            }
            //save to db
            try {
                const newChat = new Chat({
                    sender: data.sender,
                    receiver: data.receiver,
                    message: data.message
                })

                await newChat.save()
                console.log('Message Saved to Database')
            } catch (error) {
                console.log('Error Saving Message: ', error)
            }
        })

        socket.on('disconnect', () => {
            connectedUsers.delete(socket.userId)
            console.log(`User disconnected: ${socket.userId}`)
        })
    })

    return io;
};

module.exports = { setupSocket, connectedUsers, getIo: () => io }
