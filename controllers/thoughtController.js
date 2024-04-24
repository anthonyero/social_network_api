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
				{ $or: [{_id: req.body.userId}, {username: req.body.username}] }, // Matches based on username, but if a user passes their userID that will match first
				{ $addToSet:  { thoughts: new ObjectId(thoughtData) }},
				{ runValidators: true, new: true }
			);
			res.status(201).json(thoughtData);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Update a thought
	async updateThought(req, res) {
		try {
			const thoughtData = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: { thoughtText: req.body.thoughtText, username: req.body.username }},
				{ runValidators: true, new: true }
			);

			if (!thoughtData) {
				return res.status(404).json({ message: 'No thought found with that id value' });
			}

			res.status(201).json(thoughtData);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Delete a thought
	async deleteThought(req, res) {
		try {
			const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
			
			if (!thoughtData) {
				return res.status(404).json({ message: 'No thought found with that id value' });
			};

			// If a thought is deleted, we would like to update the user's thoughts array to reflect this change
			// A userId is not associated with a thought, so we will username to do so

			const userData = await User.findOneAndUpdate(
				{ username: thoughtData.username },
				{$pull: { thoughts: new ObjectId(thoughtData) }},
				{ runValidators: true, new: true }
			);

			res.status(200).json({ message: 'Thought was successfully deleted' });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Post a reaction to a though
	async createNewReaction(req, res) {
		try {
			const thoughtData = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId},
				{ $addToSet: { reactions: req.body }}, // The push method also an option; addToSet prevents duplicates
				{ runValidators: true, new: true}
			);

			if (!thoughtData) {
				return res.status(404).json({ message: 'No thought found with that id value' });
			};

			res.status(201).json(thoughtData);
		} catch (err) {
			res.status(500).json(err);
		}
	}
}
