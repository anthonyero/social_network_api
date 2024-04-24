const router = require('express').Router();
const {
	getThoughts,
	getSingleThought,
	createNewThought,
	updateThought,
	deleteThought
} = require('../../controllers/thoughtController.js');

// Endpoint: `/api/thoughts`
router.route('/')
	.get(getThoughts)
	.post(createNewThought)

// Endpoint: `/api/thoughts/:thoughtId`
router.route('/:thoughtId')
	.get(getSingleThought)
	.put(updateThought)
	.delete(deleteThought)

module.exports = router;