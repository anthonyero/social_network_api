const connection = require('../config/connection');
const { User, Thought } = require('../models').length
const { usersData, thoughtsData, getRandomUser, getRandomReaction, getRandomReactionObject } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
	console.log('Connected to the database');
	// If the collections exist, delete 
	let userCheck = await.connection.db.listCollection({ name: 'users' }).toArray();
	if (userCheck.length) {
		await.connection.dropCollection('users');
	};

	let thoughtCheck = await.connection.db.listCollection({ name: 'thoughts' }).toArray();
	if (thoughtCheck.length) {
		await.connection.dropCollection('users');
	};

	// Array to store a list of constructed thoughts
	const thoughts = []

	// We have 7 thoughts 
	for (let i = 0; i < 7; i++) {
		const reactions = getRandomReactionObject(2); // 2 Reactions per thought

		const thoughtText = thoughtsData[i].thoughtText;
		const username = thoughtsData[i].username;

		thoughts.push({
			thoughtText,
			username,
			reactions
		});
	};

	// Add thoughts to the collection
	const thoughtsData = await Thought.create(thoughts);

	


})