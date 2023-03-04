const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
	username:{type: String, unique: true, minLength: 6, maxLength: 20},
	passhash: String,
})

module.exports = mongoose.model('User', userScheme)