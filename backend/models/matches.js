const mongoose = require('mongoose')

const matchSchema = mongoose.Schema({
    matchedOn: {
        type: Date,
        default: Date.now()
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

matchSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Match', matchSchema)