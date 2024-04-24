const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;


module.exports = {
	// Get all thoughts
	async getThoughts(req, res) {
		try {
			const thoughts = await Thought.find()
				.select('-__v');
			res.status(200).json(thoughts);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Get a specific thought by its `_id`
	async getSingleThought(req, res) {
		try {
			const thought = await Thought.findOne({ _id: req.params.thoughtId})
			.select('-__v')
			.populate({ path: 'reactions', select: '-__v'});
			res.status(200).json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Create a new thought
	async createNewThought(req, res) {
		try {
			const thoughtData = await Thought.create(req.body);

			// We want to also add this new thought to the User's document
			const updateUser = await User.findOneAndUpdate(
				{ $or: [{_id: req.body.userId}, {username: req.body.username}]}, // Matches based on username, but if a user passes their userID that will match first
				{ $addToSet:  { thoughts: new ObjectId(thoughtData) }},
				{ runValidators: true, new: true }
			);
			res.status(201).json(thoughtData);
		} catch (err) {
			res.status(500).json(err);
		}
	},
}
