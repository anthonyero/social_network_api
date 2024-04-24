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

	//
}