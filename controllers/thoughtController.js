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

	// Get a specific thought by its `_id`
	async getSingleThought(req, res) {
		try {
			const user = await Thought.findOne({ _id: req.params.thoughtId})
			.select('-__v')
			.populate({ path: 'reactions', select: '-__v'});
			res.status(200).json(user)
		} catch (err) {
			res.status(500).json(err)
		}
	},
}
