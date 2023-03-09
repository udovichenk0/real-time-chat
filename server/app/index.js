const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const {Server} = require('socket.io')
const {sessionMiddleware, wrapper, authorizedUser,onDisconnect,friendsWithStatus} = require('./config')
const authRouter = require('./routes/authRouter')
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
app.use(sessionMiddleware)
app.use('/', authRouter)
app.use('/', friendshipRouter)

io.use(wrapper(sessionMiddleware))
io.use(authorizedUser)
io.on('connect', async (socket) => {
	socket.join(socket.user.userId)
	const friends = await FriendshipService.getFriends(socket.user.userId)
	const socketController = new SocketController(socket, friends)

	await socketController.getFriends()
	await socketController.emitOnlineStatus()
	onDisconnect(socket, friends)
})


const start = async () => {
	try {
		server.listen(process.env.PORT, () => {
			console.log('server started')
		})
		await mongoose.connect(process.env.MONGODB_URL)
	} catch (error) {
		throw new Error(error)
	}
}

start()