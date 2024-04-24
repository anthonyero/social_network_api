const router = require('express').Router();
const {
	getThoughts,
	getSingleThought
} = require('../../controllers/thoughtController.js');

// Endpoint: `/api/thoughts`
router.route('/')
	.get(getThoughts)

// Endpoint: `/api/thoughts/:thoughtId`
router.route('/:thoughtId')
	.get(getSingleThought)

module.exports = router;