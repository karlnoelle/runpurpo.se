const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const process = require('process');
const Strategy = require('passport-local').Strategy
global.app = express();
var bodyParser = require('body-parser');

var users = [
    {id: 1, username: 'rick', password: 'petty', displayName: 'rp', emails: [ { value: 'rp@aol.net'} ] }
];

passport.use(new Strategy(
    function(username, password, cb) {
        if (username === 'rick' && password === 'petty') {
            return cb(null, users [0]);
        }
        else cb(new Error('User ' + username + ' is erroring'));
    }
));

app.use(bodyParser.json()); // for parsing application/json
require('./events');

app.use(express.static("client"));
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
app.get('/event', function (request, response) {

    // TODO: load event from DB
});

// Open connection to MongoDB
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});



//listen for a connecion in the browser
app.listen(3000, () => console.log('runpurpose is listening on port 3000'));
