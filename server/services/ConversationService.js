const Conversation = require('../entities/Conversation/model')
const User = require('../entities/User/userModel')
class ConversationService {
    async createConversation(senderObjId,recipientObjId,message, uid){

        return await Conversation.create({sender: senderObjId, recipient: recipientObjId, message, uid})
    }
    async getMessages(user, friend){
        const friendObjId = await User.findOne({userId: friend})
        const  messages = await Conversation.find(
            {$or: [{sender: user, recipient: friendObjId._id}, {sender:friendObjId._id, recipient: user}]}
        ).populate({
            path: 'sender',
            select: '-passhash -_id -friends'
        }).populate({
            path: 'recipient',
            select: '-passhash -_id -friends'
        })
        return messages
    }
}

module.exports = new ConversationService()