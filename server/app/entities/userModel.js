const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
	username: String,
	passhash: String,
})

module.exports = mongoose.model('User', userScheme)