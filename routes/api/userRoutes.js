const router = require('express').Router();
const {
	getUsers,
	getSingleUser,
	createNewUser,
	updateUser,
	deleteUser
} = require('../../controllers/userController.js');

// Endpoint: `/api/users`
router.route('/')
	.get(getUsers)
	.post(createNewUser)


// Endpoint: `/api/users/userId`
router.route('/:userId')
	.get(getSingleUser)
	.put(updateUser)
	.delete(deleteUser)


module.exports = router;