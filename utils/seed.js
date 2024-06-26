const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usersData, thoughtsData, getRandomUser, getRandomReaction, getRandomReactionObject } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
	console.log('Connected to the database');
	// If the collections exist, delete 
	let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
	if (userCheck.length) {
		await connection.dropCollection('users');
	};

	let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
	if (thoughtCheck.length) {
		await connection.dropCollection('thoughts');
	};

	// Array to store a list of constructed thoughts
	const thoughts = []

	// We have 7 thoughts 
	for (let i = 0; i < thoughtsData.length; i++) {
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
	const thoughtsObjectsData = await Thought.create(thoughts);
	// Create 6 users and only attaches reactions with the same username as the user document
	for (let i = 0; i < usersData.length; i++) {
		await User.create({
			username: usersData[i].username,
			email: usersData[i].email,
			thoughts: [...thoughtsObjectsData.filter(function({username}) {
				return username === usersData[i].username;
			})], // This will only assign thoughts that contain the same username as the created users
			friends: [] // Explore options to populate through seeds. May require saving all users data and updating users accordingly
		});
	};

	// let seededUserData = await connection.db.listCollections({ name: 'users' }).toArray();
	
	// To populate friends, collect all inserted data and randomly select a user object to pass 
	// if (seededUserData.length){
	// 	for (let i = 0; i < seededUserData.length; i++){
	// 		await User.findOneAndUpdate(
	// 			{ _id: seededUserData[i]['_id']},
	// 			{ $addToSet: { friends: [function () {
	// 				return seededUserData[Math.floor(Math.random() * seededUserData.length)] }]
	// 			}}
	// 		);
	// 	}

	// };

	// Log out the seed data
	// console.table(seededUserData);
	console.table(thoughts);
	console.info('Seeding complete');
	process.exit(0);
})