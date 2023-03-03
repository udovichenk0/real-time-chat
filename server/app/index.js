const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const server = http.createServer(app)
const authRouter = require('./routes/authRouter')
const cors = require('cors')
const session = require('express-session')

app.use(express.json())
dotenv.config()
app.use(cors({
	credentials: true,
	origin: 'http://localhost:3000',
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.use(session({
	secret: 'mysecret',
	name: 'sid',
	resave: false,
	saveUninitialized: false,
}))
app.get('/', (req, res, next) => {
	req.session.foo = 'some text here'
	res.send('Hello World!')
	console.log("get")
	next()
  })


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