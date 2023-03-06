const mongoose = require("mongoose");
const Friend = require("../entities/Friend/friendModel");
const User = require("../entities/User/userModel");

class FriendshipService {
    async addFriend(requesterId, recipientId){
            const requesterObjId = new mongoose.Types.ObjectId(requesterId)
            const recipientObjId = new mongoose.Types.ObjectId(recipientId)

            const docA = await Friend.findOneAndUpdate({requester: requesterObjId,recipient: recipientObjId},{$set: {status: 'pending'}}, {upsert: true, new: true})
            const docB = await Friend.findOneAndUpdate({requester: recipientObjId, recipient: requesterObjId}, {$set: {status: 'pending'}}, {upsert: true, new: true})
            const updateUser = await User.findOneAndUpdate({_id: requesterObjId}, {$push: {friends: docA._id}})
            const updateFriend = await User.findOneAndUpdate({_id: recipientObjId}, {$push: {friends: docB._id}})
    }

    async getFriends(userId){
        const userObjId = new mongoose.Types.ObjectId(userId)

        const user = await User.findById(userObjId)
            .populate({
                path: 'friends',
                populate: {
                    path: 'friend',
                },
            })
       return user.friends
    }
    async acceptFriendship(requesterId, recipientId){
        await Friend.findOneAndUpdate({requester: requesterId, recipient: recipientId}, {$set: {status: 'accepted'}})
        await Friend.findOneAndUpdate({requester: recipientId, recipient: requesterId}, {$set: {status: 'accepted'}})
    }
}

module.exports = new FriendshipService()