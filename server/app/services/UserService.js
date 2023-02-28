const User = require('../entities/userModel')
class UserService {
	async getUser(username){
		const user = await User.findOne({username})
		return user
	}
	async createUser(username, passhash){
		try {
			const createdUser = await User.create({username, passhash})
			return createdUser
		} catch (error) {
			return error
		}
	}
}

module.exports = new UserService()