const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
    requester: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'requested']
    }
})

module.exports = mongoose.model('Friend', friendSchema)