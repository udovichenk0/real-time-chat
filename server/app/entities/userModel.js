const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
	username: {type: String, minLength: 6, maxLength: 20, trim: true, unique: true},
	passhash: {type: String},
})

module.exports = mongoose.model('User', userScheme)