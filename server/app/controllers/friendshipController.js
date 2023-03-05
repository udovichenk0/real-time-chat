const FriendshipService = require('../services/FriendshipService')

const Friend = require('../entities/Friend/friendModel')
const User = require('../entities/User/userModel')
const mongoose = require('mongoose')

class FriendshipController {
    async addFriend(req, res){
        const {user, friend} = req.body
        await FriendshipService.addFriend(user, friend)
        res.send('hello')
    }
    async getFriends(req, res){
        try{
        const {userId} = req.query
            const friends = await FriendshipService.getFriends(userId)
            res.status(200).send(friends)
        }
        catch (err){
            res.status(400).send('Something went wrong')
        }
    }
}


module.exports = new FriendshipController()