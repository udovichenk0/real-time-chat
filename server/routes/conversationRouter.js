const router = require('express').Router()
const ConversationController = require('../controllers/ConversationController')
router.get('/get-messages', ConversationController.getMessages)

module.exports = router