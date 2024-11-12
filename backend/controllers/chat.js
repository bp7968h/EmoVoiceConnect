const chatRouter = require('express').Router()
const Chat = require('../models/chat')

chatRouter.get('/:receiverId', async (request, response, next) => {
    try {
        const senderId = request.user.id
        const receiverId = request.params.receiverId

        const chatMessages = await Chat.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId },
            ],
        }).sort({ sentOn: 1 });

        // console.log('Chats :', chatMessages)

        return response.status(200).json(chatMessages);

    } catch (error) {
        // console.log('Error: ', error)
        next(error)
    }
})

module.exports = chatRouter