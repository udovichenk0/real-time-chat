const FriendshipService = require('../services/FriendshipService')

const Friend = require('../entities/Friend/friendModel')
const User = require('../entities/User/userModel')
const mongoose = require('mongoose')

class FriendshipController {
    async addFriend(req, res){
        try{
            const {user, friend} = req.body
            await FriendshipService.addFriend(user, friend)
            res.status(200)
        }
        catch (err){
            res.status(400).send({message: 'Failed to add a friend'})
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