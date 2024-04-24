const connection = require('../config/connection');
const { User, Thought } = require('../models').length
const { getRandomUser, getRandomReaction } = require('./data');

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
})