const express = require('express');
const passport = require('passport');
const process = require('process');
//const Strategy = require('passport-local').Strategy
const app = express();

/* var users = [
    {id: 1, username: 'rick', password: 'petty', displayName: 'rp', emails: [ { value: 'rp@aol.net'} ] }
]; */

/* passport.use(new Strategy(
    function(username, password, cb) {
        if (username === 'rick' && password === 'petty') {
            return cb(null, users [0]);
        }
        else cb(new Error('User ' + username + ' is erroring'));
    }
)); */

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

app.listen(3000, () => console.log('runpurpose is listening on port 3000'));