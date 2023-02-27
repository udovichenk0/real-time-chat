const User = require('../entities/userModel')
class UserService {
	async getUser(username){
		const user = await User.findOne({username})
		return user
	}
	async createUser(username, passhash){
		return await User.create({username, passhash})
	}
}

module.exports = new UserService()