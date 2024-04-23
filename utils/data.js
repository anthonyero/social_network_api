const usersData = [
	{
		username: 'johnsmith',
		email: 'john@email.com'
	},
	{
		username: 'janedoe',
		email: 'jane@email.com'
	},
	{
		username: 'angeliaeber',
		email: 'angelia@email.com'
	},
	{
		username: 'marillacosme',
		email: 'marilla@email.com'
	},
	{
		username: 'janrunar',
		email: 'jan@email.com'
	},
	{
		username: 'chandrajasmine',
		email: 'chandra@email.com'
	}
]

const thoughtsData = [
	{ 
		thoughtText: 'Very excited to learn REACT',
		username: 'johnsmith'
	},
	{
		thoughtText: `I'm using a NoSQL database for this social network API.`,
		username: 'johnsmith'

	},
	{
		thoughtText: 'A new social network?',
		username: 'janedoe'
	},
	{
		thoughtText: 'Cannot wait to travel',
		username: 'angeliaeber'
	},
	{
		thoughtText: 'Am I using this site correctly?',
		username: 'marillacosme'
	},
	{
		thoughtText: 'Chicago is my favorite city',
		username: 'janrunar'
	},
	{
		thoughtText: 'I hope we have weather this nice forever',
		username: 'chandrajasmine'
	}
]

const reactionsData = [
	'Agreed',
	'Same',
	'Boo',
	'Cannot believe it',
	'Strongly disagree',
	'Delete the app'
]

const getRandomUser = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)].username;
}

const getRandomReaction = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { getRandomUser, getRandomReaction };