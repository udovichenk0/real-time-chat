const mongoose = require('mongoose')
const userScheme = new mongoose.Schema({
	username:{type: String, unique: true, minLength: 6, maxLength: 20, trim: true},
	userId: {type: String, unique: true},
	passhash: String,
	friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Friends'}]
})

module.exports = mongoose.model('User', userScheme)