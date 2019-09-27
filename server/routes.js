const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./events');

const routes = require('next-routes');
module.exports = routes()
.add('/event/:eventId', 'single-event');
