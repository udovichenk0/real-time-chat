const UserService = require('../services/UserService')
const bcrypt = require('bcrypt')
class AuthController{

	async login(req,res){
		console.log(req.session)
		res.end()
	}

	async signin(req,res){
		const {username, password} = req.body
		const user = await UserService.getUser(username)
		if(user){
			const comparedPassword = await bcrypt.compare(password, user.passhash)
			if(comparedPassword){
				req.session.user ={
					username,
				}
				console.log(req.session)
				res.json({status: 200, username})
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
			res.json({status: 400, message: 'User with that user already exist'})
		}
		else{
			const passhash = await bcrypt.hash(password, 7)
			const newUser = await UserService.createUser(username, passhash)
			res.send({
				status: 200,
				username
			})
		}
		res.end()
	}
}

module.exports = new AuthController()