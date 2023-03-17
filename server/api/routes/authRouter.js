const router = require('express').Router()
const AuthController = require('../controllers/authController')

router.get('/signin', AuthController.login)
router.post('/signin', AuthController.signin)
router.post('/signup', AuthController.signup)
router.get('/test', (req,res) => res.send('asd'))

module.exports = router