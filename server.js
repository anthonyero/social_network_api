const express = require('express');
const db = require('./config/connection');
// Import routes here when they can be imported

const PORT = process.env.PORT || 3001; // If deployed remotely, PORT environment variable will be useful
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// When routes are implemented pass, routes as middleware

db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`API server listening on port ${PORT}`);
	});
});