const passport = require('passport');
const Strategy = require('passport-local').Strategy

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

app.post('/login', passport.authenticate('local'));
