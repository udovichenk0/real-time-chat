const router = require('express').Router()
const AuthController = require('../controllers/authController')

router.post('/signin', AuthController.signin)
router.post('/signup', AuthController.signup)


module.exports = router