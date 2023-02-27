const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const authRouter = require('./routes/authRouter')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const Redis = require("ioredis");

const redisClient = new Redis()

app.use(cors({
	credentials: 'true'
}))
redisClient.set("mykey", "value1");

app.use(express.json())
app.use(session({
	secret: 'mysecterkey',
	saveUninitialized: false,
	store: new RedisStore({client: redisClient}),
	resave: false,
	name: "sid",
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
		secure: app.get('env') == 'production',
		sameSite: app.get('env') == 'production' ? 'none' : 'lax',
		httpOnly: true
	}
}))
app.use('/', authRouter)
const start = async () => {
	try {
		app.listen(process.env.PORT, () => {
			console.log('server started')
		})
		mongoose.set("strictQuery", false);
		await mongoose.connect(process.env.MONGODB_URL)
	} catch (error) {
		throw new Error(error)
	}
}

start()