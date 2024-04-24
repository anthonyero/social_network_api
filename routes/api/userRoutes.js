const router = require('express').Router();
const {
	getUsers,
	getSingleUser,
	createNewUser,
	updateUser,
	deleteUser,
	addFriend,
	deleteFriend
} = require('../../controllers/userController.js');

// Endpoint: `/api/users`
router.route('/')
	.get(getUsers)
	.post(createNewUser)


// Endpoint: `/api/users/:userId`
router.route('/:userId')
	.get(getSingleUser)
	.put(updateUser)
	.delete(deleteUser)

// Endpoint: `/api/users/:userId/friends/:friendId`
router.route('/:userId/friends/:friendId')
	.post(addFriend)
	.delete(deleteFriend)

module.exports = router;