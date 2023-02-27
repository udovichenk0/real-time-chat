const UserService = require('../services/UserService')
const bcrypt = require('bcrypt')
class AuthController{
	async signin(req,res){
		console.log('jasdfio')
		res.send('signin')
	}
	async signup(req, res){
		const {username, password} = req.body
		const user = await UserService.getUser(username)
		if(user){
			const comparedPassowrd = await bcrypt.compare(password, user.passhash)
			if(comparedPassowrd){
				req.session.user={
					username,
					id: user.id
				}
				res.json({status: 200, user})
				console.log(req.session)
			}
			else{
				res.json({
					status: 400,
					message: 'Wrong password or username'
				})
			}
		}
		else{
			const passhash = await bcrypt.hash(password, 7)
			const newUser = await UserService.createUser(username, passhash)
			req.session.user={
				username,
				id: newUser.id
			}
			res.json({
				status: 200,
				username
			})
		}
	}
}

module.exports = new AuthController()