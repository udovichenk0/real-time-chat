const User = require('../entities/User/userModel')
class UserService {
	async getUser(username){
		const user = await User.findOne({username})
		return user
	}
	async createUser(username, passhash){
		try {
			const createdUser = await User.create({
				username,
				passhash,
				friends: []
			})
			return createdUser
		} catch (error) {
			return error
		}

	}
}

module.exports = new UserService()