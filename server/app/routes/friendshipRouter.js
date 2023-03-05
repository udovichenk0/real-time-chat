const router = require('express').Router()
const FriendshipController = require("../controllers/friendshipController")

router.get('/get-friends', FriendshipController.getFriends)
router.post('/add-friend', FriendshipController.addFriend)
module.exports = router
