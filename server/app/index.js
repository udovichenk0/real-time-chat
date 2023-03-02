const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const http = require('http')
const server = http.createServer(app)
const authRouter = require('./routes/authRouter')
const cors = require('cors')


app.use(express.json())
dotenv.config()
app.use(cors({
	credentials: true,
	origin: 'http://127.0.0.1:5173',
}))


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