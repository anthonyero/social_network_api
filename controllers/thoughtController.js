const { User, Thought } = require('../models');

module.exports = {
	// Get all thoughts
	async getThoughts(req, res) {
		try {
			const users = await Thought.find()
				.select('-__v');
			res.status(200).json(users);
		} catch (err) {
			res.status(500).json(err);
		}
	},
}
