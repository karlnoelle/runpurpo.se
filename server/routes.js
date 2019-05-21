const bodyParser = require('body-parser');
const events = require('./events');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

