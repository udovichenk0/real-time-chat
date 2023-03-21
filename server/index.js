const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const {MongoClient} = require('mongodb')
const {Server} = require('socket.io')
const {sessionMiddleware, wrapper, authorizedUser,onDisconnect} = require('./config')
const authRouter = require('./routes/authRouter')
const conversationRouter = require('./routes/conversationRouter')
const SocketController = require('./controllers/socketController')
const friendshipRouter = require('./routes/friendshipRouter')
const server = http.createServer(app)

//============================================

// If MongoDb uri is not provided we will throw an error
// When we first connect to the db we will cache that connection in a variable named cached so that we don't have to connect to the database again and again on each and every request.
let cached = global.mongoose
// If we don't have cached connection then first we will set conn: null, promise: null
if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

// creating an async function to connect to the db
async function connectDb() {
	// If we have cached connection then we don't  have to make connection once again. we will return the old connection.
	if (cached.conn) {
		return cached.conn
	}

	// If we don't have cached connection then we will create one and return it.

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		}
		console.log(process.env.MONGODB_URI)
		cached.promise = await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}).then((mongoose) => {
			return mongoose
		})
	}

	try {
		cached.conn = await cached.promise
	} catch (e) {
		cached.promise = null
		throw e
	}

	return cached.conn
}


//===========================================




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
		server.listen(3001, () => {
			console.log('server started')
		})
		const connectionParams={
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
		await mongoose.connect(process.env.MONGODB_URI, connectionParams).then(() => console.log('connected'))

	} catch (error) {

		throw new Error(error)
	}
}
start()