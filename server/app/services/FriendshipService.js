const mongoose = require("mongoose");
const Friend = require("../entities/Friend/friendModel");
const User = require("../entities/User/userModel");

class FriendshipService {
    async addFriend(userId, potentialFriendId){
        const userObjId = new mongoose.Types.ObjectId(userId)
        const friendObjId = new mongoose.Types.ObjectId(potentialFriendId)

        const docA = await Friend.findOneAndUpdate({user: userObjId,friend: friendObjId},{$set: {status: 'pending'}}, {upsert: true, new: true})
        const docB = await Friend.findOneAndUpdate({user: friendObjId, friend: userObjId}, {$set: {status: 'pending'}}, {upsert: true, new: true})
        const updateUser = await User.findOneAndUpdate({_id: userObjId}, {$push: {friends: docA._id}})
        const updateFriend = await User.findOneAndUpdate({_id: friendObjId}, {$push: {friends: docB._id}})
    }

    async getFriends(userId){
        const userObjId = new mongoose.Types.ObjectId(userId)

        const user = await User.findById(userObjId)
            .populate({
                path: 'friends',
                populate: {
                    path: 'friend',
                    // select: 'friend'
                },
            })
       return user.friends
    }
}

module.exports = new FriendshipService()