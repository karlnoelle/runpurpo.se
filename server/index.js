const express = require('express');
const next = require('next');
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== 'production';
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
		console.log(`runpurpo.se ready at http://localhost:${PORT}`)
	});
});
