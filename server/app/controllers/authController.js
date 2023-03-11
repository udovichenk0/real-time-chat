const UserService = require('../services/UserService')
const bcrypt = require('bcrypt')
class AuthController{

	async login(req,res){
		if(req.session.user){
			res.send(req.session.user)
		}
		else{
			res.clearCookie('sid')
			res.end()
		}
	}

	async signin(req,res){
		const {username, password} = req.body
		const user = await UserService.getUser(username)
		if(user){
			const comparedPassword = await bcrypt.compare(password, user.passhash)
			if(comparedPassword){
				const userDto = {
					username: user.username,
					userId: user.userId,
					_id: user.id,
				}
				req.session.user=userDto
				res.send(userDto)
			}
			else{
				res.status(400).send('Wrong password')
			}
		}
		else {
			res.status(400).send('Wrong username')
		}
	}


	async signup(req, res){
		const {username, password} = req.body
		const user = await UserService.getUser(username)
		if(user){
			res.status(400).send('User with that username already exists')
		}
		else{
			const passhash = await bcrypt.hash(password, 7)
			const newUser = await UserService.createUser(username, passhash)
			const userDto = {
				username: newUser.username,
				userId: newUser.userId,
				_id: newUser._id,
			}
			req.session.user=userDto
			res.send(userDto)
		}
	}
}

module.exports = new AuthController()