const express = require('express');
const next = require('next');
const PORT = process.env.PORT || 3000;
const deployEnvironment = process.env.NODE_ENV || 'dev';
global.baseURL = (deployEnvironment === 'production')
	? 'https://runpurpo.se'
	: (deployEnvironment === 'test')
		? 'http://test.runpurpo.se'
		: `http://localhost:${PORT}`;
const dev = deployEnvironment !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
	global.app = express();
	const routes = require('./routes');
	app.use(routes.getRequestHandler(nextApp));

	// Route to handle all the React stuff.
	app.get('*', (req,res) => handle(req,res));
	app.listen(PORT, err => {
		if (err) { throw err; }
		console.log(`runpurpo.se ready at ${baseURL}`);
	});
});
