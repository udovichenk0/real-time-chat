const mongoose = require("mongoose");
const Friend = require("../entities/Friend/friendModel");
const User = require("../entities/User/userModel");

class FriendshipService {
    async addFriend(requesterId, recipientId){
        const requesterObjId = new mongoose.Types.ObjectId(requesterId)
        const recipientObjId = new mongoose.Types.ObjectId(recipientId)

        const docA = await Friend.findOneAndUpdate({requester: requesterObjId,recipient: recipientObjId},{$set: {status: 'pending'}}, {upsert: true, new: true})
        const docB = await Friend.findOneAndUpdate({requester: recipientObjId, recipient: requesterObjId}, {$set: {status: 'pending'}}, {upsert: true, new: true})
        const updateFriend = await User.findOneAndUpdate({_id: recipientObjId}, {$push: {friends: docB._id}})
        const updateUser = await User.findOneAndUpdate({_id: requesterObjId}, {$push: {friends: docA._id}})
    }

    async getFriends(userId){
        const user = await User.findOne({userId})
            .populate({
                path: 'friends',
                populate: {
                    path: 'recipient',
                    select: '-friends -passhash -_id'
                },
                match: {status: 'accepted'},
                select: ['recipient', 'status']
            })
        return user.friends
    }
    async getPendingFriends(userId){
        const user = await User.findOne({userId})
            .populate({
                path: 'friends',
                populate: {
                    path: 'recipient',
                    select: '-friends -passhash -_id'
                },
                match: {status: 'pending'},
                select: ['recipient', 'status']
            })

        return user.friends
    }
    async acceptFriendship(requesterId, recipientId){
        await Friend.findOneAndUpdate({requester: requesterId, recipient: recipientId}, {$set: {status: 'accepted'}})
        await Friend.findOneAndUpdate({requester: recipientId, recipient: requesterId}, {$set: {status: 'accepted'}})
    }
}

module.exports = new FriendshipService()