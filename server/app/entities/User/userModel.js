const mongoose = require('mongoose')
const userScheme = new mongoose.Schema({
	username:{type: String, unique: true, minLength: 6, maxLength: 20, trim: true},
	passhash: String,
	friends: {
		type: [{
			name: {type: String, unique: true, minLength: 6, maxLength: 20},
			friendId: {type: String, unique: true}
		}],
		default: []
	}
})

module.exports = mongoose.model('User', userScheme)