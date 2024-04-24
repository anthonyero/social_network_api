const router = require('express').Router();
const {
	getThoughts,
	getSingleThought,
	createNewThought,
	updateThought,
	deleteThought,
	createNewReaction,
	deleteReaction
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

// Endpoint: `/api/thoughts/:thoughtId/reactions`
router.route('/:thoughtId/reactions')
	.post(createNewReaction)

// Endpoint: `/api/thoughts/:thoughtsId/reactions/:reactionId`
router.route('/:thoughtId/reactions/:reactionId')
	.delete(deleteReaction)

module.exports = router;