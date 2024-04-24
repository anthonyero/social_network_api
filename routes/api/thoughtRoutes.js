const router = require('express').Router();
const {
	getThoughts,

} = require('../../controllers/thoughtController.js');

// Endpoint: `/api/thoughts`
router.route('/')
	.get(getThoughts)

module.exports = router;