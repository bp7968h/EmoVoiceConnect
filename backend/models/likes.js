const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likedOn: {
        type: Date,
        default: Date.now()
    }
})

likeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Like', likeSchema)
