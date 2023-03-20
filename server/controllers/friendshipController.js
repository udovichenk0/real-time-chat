const FriendshipService = require('../services/FriendshipService')
const {friendsWithStatus} = require("../config");
class FriendshipController {
    async addFriend(req, res){
        try{
            const {userId, friendName} = req.body
            await FriendshipService.addFriend(userId, friendName)
            res.status(200).send('done')
        }
        catch (err){
            res.status(400).send({message: 'Failed to add a ApiFriend'})
        }
    }
    async getFriends(req, res){
        try{
        const {userId} = req.query
            const friends = await FriendshipService.getFriends(userId)
            console.log('asdoadfioajsdf')
            const updatedStatus = await friendsWithStatus(friends)
            res.status(200).send(updatedStatus)
        }
        catch (err){

            res.status(400).send(err)
        }
    }
    async getPendingFriends(req,res){
        try{
            const {userId} = req.query
            const friends = await FriendshipService.getPendingFriends((userId))
            res.status(200).send(friends)
        }
        catch (err){
            res.status(400).send({message: 'Failed to get users'})
        }
    }


    async acceptFriendship(req,res){
        try {
            const {userId, friendId} = req.body
            await FriendshipService.acceptFriendship(userId, friendId)
            res.sendStatus(200)
        }
        catch (err){
            res.send(400).send({message: 'Failed to accept a friendship'})
        }
    }


}


module.exports = new FriendshipController()