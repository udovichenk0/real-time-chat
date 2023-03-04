const UserService = require('../services/UserService')
const bcrypt = require('bcrypt')
class AuthController{

	async login(req,res){
		if(req.session.user){
			res.send(req.session.user)
		}
		res.end()
	}

	async signin(req,res){
		const {username, password} = req.body
		const user = await UserService.getUser(username)
		if(user){
			const comparedPassword = await bcrypt.compare(password, user.passhash)
			if(comparedPassword){
				const userDto = {
					username: user.username,
					_id: user.id,
					friends: user.friends
				}
				req.session.user=userDto
				res.send(userDto)
			}
			else{
				res.json({
					status: 400,
					message: 'Wrong password'
				})
			}
		}
		else {
			res.json({
				status: 400,
				message: 'Wrong username'
			})
		}
	}


	async signup(req, res){
		const {username, password} = req.body
		const user = await UserService.getUser(username)
		if(user){
			res.json({status: 400, message: 'User with that username already exists'})
		}
		else{
			const passhash = await bcrypt.hash(password, 7)
			const newUser = await UserService.createUser(username, passhash)

			const userDto = {
				username: newUser.username,
				_id: newUser.id,
				friends: newUser.friends
			}
			req.session.user=userDto
			res.send(userDto)
		}
	}
}

module.exports = new AuthController()