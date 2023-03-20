const ConversationService = require('../services/ConversationService')
const {uuid} = require('uuidv4')
const User = require('../entities/User/userModel')
const userDto = require('../entities/User/userDto')
const FriendshipService = require("../services/FriendshipService");
const friendDto = require('../entities/Friend/friendDto')

const {friendWithStatus} = require('../config')

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
            this.socket.to(recipient.userId).emit('receive-message', senderDto,recipientDto,message, uid, msg.createdAt)
            this.socket.emit('receive-message', senderDto,recipientDto,message, uid, createdAt)
        })
    }
    async getPendFriends(){
            const friends = await FriendshipService.getPendingFriends(this.socket.user.userId)
        this.socket.emit('get-pend-friends', friends)
    }
    async getFriends(){
        this.socket.emit('get-friends', this.friends)
    }
    async acceptFriendship(){
        const userId = this.socket.user.userId
        this.socket.on('accept-friendship', async (friendId) => {
            await FriendshipService.acceptFriendship(userId, friendId)
                .then(async ({requesterFriend, recipientFriend}) => {
                    const requesterFriendDto = await friendDto(requesterFriend)
                    const recipientFriendDto = await friendDto(recipientFriend)

                    const reqWithOnlineStatus = await friendWithStatus(requesterFriendDto)
                    const recWithOnlineStatus = await friendWithStatus(recipientFriendDto)

                    this.socket.to(friendId).emit('request-accepted', recWithOnlineStatus)
                    this.socket.emit('accept', reqWithOnlineStatus)
                })
        })
    }

    async addFriend(){

        this.socket.on('add-friend', async (friendName) => {
            const userId = this.socket.user._id
            const {pendingFriend, recipientId} = await FriendshipService.addFriend(userId, friendName)
            const pendingFriendDto = await friendDto(pendingFriend)
            this.socket.to(recipientId).emit('requested', pendingFriendDto)

        })
    }

}



module.exports = SocketController