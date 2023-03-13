const ConversationService = require('../services/ConversationService')
const {uuid} = require('uuidv4')
const User = require('../entities/User/userModel')
const userDto = require('../entities/User/userDto')
class SocketController {
    socket;
    friends
    constructor(socket, friends) {
        this.socket = socket
        this.friends = friends
    }
    async emitOnlineStatus(){
        for(let friend of this.friends){
            this.socket.to(friend.recipient.userId).emit('connected', true, this.socket.user.userId)
        }
    }
    async sendMessage(){
        this.socket.on('send-message', async ({recipientId, message}) => {
            const uid = uuid()
            const sender = await User.findOne({userId: this.socket.user.userId})
            const recipient = await User.findOne({userId: recipientId})
            const senderDto = userDto(sender)
            const recipientDto = userDto(recipient)
            const senderObjId = this.socket.user._id
            const msg = await ConversationService.createConversation(senderObjId,recipient._id,message,uid)
            const createdAt = msg.createdAt
            this.socket.to(recipient).emit('receive-message', senderDto,recipientDto,message, uid, msg.createdAt)
            this.socket.emit('receive-message', senderDto,recipientDto,message, uid, createdAt)
        })
    }
}


module.exports = SocketController