const LISTEN_PORT = 3000;

const bodyParser = require('body-parser');
const express = require('express');
const expressNunjucks = require('express-nunjucks');
const mongoose = require('mongoose');
const nunjucks  = require('nunjucks');
const passport = require('passport');
const Strategy = require('passport-local').Strategy
const process = require('process');

global.app = express();

var users = [
	{id: 1, username: 'rick', password: 'petty', displayName: 'rp', emails: [{value: 'rp@aol.net'}]}
];

passport.use(new Strategy(
	function (username, password, cb) {
		if (username === 'rick' && password === 'petty') {
			return cb(null, users [0]);
		}
		else cb(new Error('User ' + username + ' is erroring'));
	}
));

app.set('views', __dirname + '/../client/templates');
expressNunjucks(app, 'views', {
  autoescape: true,
	noCache: true,
	watch: true,
});

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static("client"));

require('./events');

app.post('/login', passport.authenticate('local'));
app.get('/profile', function (request, response) {
	// TODO: validate user
	let valid = true;
	if (valid) {
		response.sendFile(process.cwd() + '/client/profile.html');
	} else {
		response.redirect('/');
	}
});

// Open connection to MongoDB
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	// we're connected!
});


//listen for a connecion in the browser
app.listen(3000, () => console.log('runpurpose is listening on port 3000'));
