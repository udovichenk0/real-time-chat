const ConversationService = require('../services/ConversationService')
class ConversationController {
    async getMessages(req,res){
        const {userId, friendId} = req.query
        const messages = await ConversationService.getMessages(userId, friendId)
        res.send(messages)
    }
}

module.exports = new ConversationController()