const FriendshipService = require('../services/FriendshipService')

const Friend = require('../entities/Friend/friendModel')
const User = require('../entities/User/userModel')
const mongoose = require('mongoose')


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
            res.status(200).send(friends)
        }
        catch (err){
            res.status(400).send({message: 'Failed to get friends'})
        }
    }
    async getPendingFriends(req,res){
        try{
            const {userId} = req.query
            const pendingFriends = await FriendshipService.getPendingFriends((userId))
            res.status(200).send(pendingFriends)
        }
        catch (err){
            res.status(400).send({message: 'Failed to get users'})
        }

    }
    async acceptFriendship(req,res){
        try {
            const {user, friend} = req.body
            await FriendshipService.acceptFriendship(user, friend)
            res.sendStatus(200)
        }
        catch (err){
            res.send(400).send({message: 'Failed to accept a friendship'})
        }
    }


}


module.exports = new FriendshipController()