const bodyParser = require('body-parser');
const expressNunjucks = require('express-nunjucks');

app.set('views', __dirname + '/../client/templates');
expressNunjucks(app, 'views', {
  autoescape: true,
	noCache: true,
	watch: true,
});

app.use(bodyParser.json()); // for parsing application/json
app.use(express.static("client"));
app.use('/node_modules', express.static(`${__baseDir}/node_modules`));


app.get('/profile', function (request, response) {
	// TODO: validate user
	let valid = true;
	if (valid) {
		response.sendFile(__baseDir + '/client/profile.html');
	} else {
		response.redirect('/');
	}
});