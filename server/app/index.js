const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const server = http.createServer(app)
const authRouter = require('./routes/authRouter')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require("connect-mongo")
const Redis = require('ioredis')
const redisClient = new Redis()
dotenv.config()
app.use(cors({
	credentials: 'true',
}))

app.use(session({
	secret: process.env.SESSION_SECRET,
	name: 'sess_test',
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create(),
	cookie: {
		secure: app.get('env') === 'production',
		httpOnly: true,
		maxAge: 1000 * 60 * 60 * 24 * 7,
		sameSite: app.get('env') === 'production' ? 'none' : 'lax'
	}
}))
app.use(express.json())
app.use('/', authRouter)

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