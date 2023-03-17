const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: {type: String},
    uid: {type: String, unique: true}
}, {
    timestamps: true
})

module.exports = mongoose.model('Conversation', conversationSchema)