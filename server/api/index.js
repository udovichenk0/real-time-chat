const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const {Server} = require('socket.io')
const {sessionMiddleware, wrapper, authorizedUser,onDisconnect} = require('./config')
const authRouter = require('./routes/authRouter')
const conversationRouter = require('./routes/conversationRouter')
const SocketController = require('./controllers/socketController')
const friendshipRouter = require('./routes/friendshipRouter')
const server = http.createServer(app)

const cors = require('cors')
const FriendshipService = require("./services/FriendshipService");




const io = new Server(server, {
	cors:{
		origin: 'http://localhost:3000',
		credentials: true
	}
})


app.use(express.json())
dotenv.config()
app.use(cors({
	credentials: true,
	origin: 'http://localhost:3000',
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))
io.use(wrapper(sessionMiddleware))
io.use(authorizedUser)
app.use(sessionMiddleware)
app.use('/', conversationRouter)
app.use('/', authRouter)
app.use('/', friendshipRouter)
io.on('connect', async (socket) => {
	const friends = await FriendshipService.getFriends(socket.user.userId)
	const rooms = friends.map(({recipient}) => recipient.userId)
	socket.join([...rooms, socket.user.userId])
	const socketController = new SocketController(socket, friends)

	await socketController.getPendFriends()
	await socketController.getFriends()
	await socketController.acceptFriendship()
	await socketController.addFriend()
	await socketController.sendMessage()
	await socketController.emitOnlineStatus()
	onDisconnect(socket, friends)
})



const start = async () => {
	try {
		server.listen(process.env.PORT || 3001, () => {
			console.log('server started')
		})
		await mongoose.connect(process.env.MONGODB_URL)
	} catch (error) {
		throw new Error(error)
	}
}
start()