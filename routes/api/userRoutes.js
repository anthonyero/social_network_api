const router = require('express').Router();
const {
	getUsers,
	getSingleUser,
	createNewUser
} = require('../../controllers/userController.js');

// Endpoint: `/api/users`
router.route('/')
	.get(getUsers)
	.post(createNewUser)

// Endpoint: `/api/users/userId`
router.route('/:userId')
	.get(getSingleUser)


module.exports = router;