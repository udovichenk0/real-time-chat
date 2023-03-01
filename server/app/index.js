const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const server = http.createServer(app)
const authRouter = require('./routes/authRouter')
const cors = require('cors')
const session = require('express-session')
var cookieParser = require('cookie-parser')
const MongoStore = require("connect-mongo")

app.set('trust proxy', 1)
// app.use(cookieParser())
app.use(express.json())
dotenv.config()
app.use(cors({
	credentials: true,
	// methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
	origin: 'http://127.0.0.1:5173',
}))

app.use(session({
	secret: 'process.env.SESSION_SECRET',
	name: 'sid1',
	resave: false,
	saveUninitialized: true,
	// store: MongoStore.create({
	// 	mongoUrl: process.env.MONGODB_URL
	// }),
	cookie: {
		secure:app.get('env') == 'production' ? true : "auto",
		httpOnly: true,
		sameSite: app.get('env') == 'production' ? "none" : 'lax'
	}
}))

// app.use('/', (req,res, next)=> {
// 	res.send('asdf')
// 	next()
// })
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