const { User, Thought } = require('../models');

module.exports = {
	// Get all users
	async getUsers(req, res) {
		try {
			const users = await User.find()
				.select('-__v');
			res.status(200).json(users);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Retrieve a specific user by their `_id`
	async getSingleUser(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.userId})
			.select('-__v')
			.populate({ path: 'thoughts', select: '-__v'});
			res.status(200).json(user)
		} catch (err) {
			res.status(500).json(err)
		}
	},


}