const session = require("express-session");
// import {createClient} from "redis"
const RedisStore = require('connect-redis').default
// const Redis = require('ioredis')
// let redisClient = new Redis()
// redisClient.connect().catch(console.error)
// Initialize store.
// let redisStore = new RedisStore({
//     client: redisClient,
// })
const sessionMiddleware = session({
    secret: 'my_secret_key',
    name: 'sid',
    // store: redisStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true
    }
})

const corsConfig = {
    origin: 'https://real-time-chat-ui3l.vercel.app',
    credentials: true
}

const authorizedUser = (socket,next) => {
    if(!socket.request.session.user || !socket.request.session.user.userId){
        next(new Error('Not authorized'))
    }

    socket.user = {...socket.request.session.user}
    // redisClient.hset(
    //     `user:${socket.user.userId}`,
    //     'connected', true
    // )
    next()
}
const wrapper = (expressMiddleware) => (socket, next) => {
    return expressMiddleware(socket.request, {}, next)
}

const onDisconnect = (socket, friends) => {
    socket.on('disconnect',async () => {
        // redisClient.hset(
        //     `user:${socket.user.userId}`,
        //     'connected', false
        // )
        for(let friend of friends){
            socket.to(friend.recipient.userId).emit('connected', false, socket.user.userId)
        }
    })
}

async function friendsWithStatus (friends) {
    const friendList = []
    for(let friend of friends){
        // const isConnected = await redisClient.hget(`user:${friend.recipient.userId}`, 'connected')
        let clonedFriend = friend.toObject();
        // clonedFriend.connected = JSON.parse(isConnected)
        friendList.push(clonedFriend)
    }
    return friendList
}

async function friendWithStatus(friend){
    // const isConnected = await redisClient.hget(`user:${friend.recipient.userId}`, 'connected')
    // friend.connected = JSON.parse(isConnected)
    return friend
}


module.exports = {sessionMiddleware, wrapper, authorizedUser, corsConfig, onDisconnect, friendsWithStatus, friendWithStatus}