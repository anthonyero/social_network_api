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

	// Create a new user
	async createNewUser(req, res) {
		try {
			const userData = await User.create(req.body);
			res.status(201).json(userData)
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Update a user's information
	async updateUser(req, res) {
		try {
			const userData = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $set: { username: req.body.username, email: req.body.email }},
				{ runValidators: true, new: true } // Run validators on the updates; without, users can submit invalid data. Share the newly updated user information with the user
			);

			// I don't believe this is accessible/implemented because when an incorrect userId is submitted, we receive an object with the error
			if (!userData) {
				return res.status(404).json({ message: 'No user found with that id value' });
			}

			res.status(201).json(userData);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Delete a user 

	async deleteUser(req, res) {
		try {
			const userData = await User.findOneAndDelete({ _id: req.params.userId });

			if (!userData) {
				return res.status(404).json({ message: 'No user found with that id value' });
			};

			// We will also want to delete a user's thoughts. Have to do this manually; no cascade functionality like SQL
			// Would prefer to use id to delete but the Thoughts schema does not have userId associated with it
				// The reason it would be preferred is because usernames can be changed 
			await Thought.deleteMany({ username: userData.username });
			res.status(200).json({ message: 'User and their respective Thoughts were successfully deleted' });	
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Adding another user to a user's friend's list
		// Note: This does not automatically add the user to the friend's friends list. 
		// May be a good exercise for future development

	async addFriend(req, res) {
		try {
			const updateUserData = await User.findOneAndUpdate(
				{ _id: req.params.userId},
				{$addToSet: { friends: req.params.friendId }},
				{ runValidators: true, new: true }
			);

			if (!updateUserData) {
				return res.status(404).json({ message: 'No user found with that id value' });
			};
			res.status(201).json(updateUserData)
		} catch (err) {
			res.status(500).json(err);
		}	
	},


}