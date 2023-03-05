const User = require('../entities/User/userModel')
const uuidv4 = require('uuidv4')
class UserService {
	async getUser(username){
		const user = await User.findOne({username})
		return user
	}
	async createUser(username, passhash){
		try {
			const createdUser = await User.create({
				username,
				userId: uuidv4.uuid(),
				passhash,
			})
			return createdUser
		} catch (error) {
			return error
		}

	}
}

module.exports = new UserService()