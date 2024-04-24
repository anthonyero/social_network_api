const router = require('express').Router();
const {
	getUsers,
	getSingleUser
} = require('../../controllers/userController.js');

// Endpoint: `/api/users`
router.route('/')
	.get(getUsers)

// Endpoint: `/api/users/userId`
router.route('/:userId')
	.get(getSingleUser)


module.exports = router;