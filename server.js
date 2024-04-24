const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001; // If deployed remotely, PORT environment variable will be useful
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(routes);

db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`API server listening on port ${PORT}`);
	});
});